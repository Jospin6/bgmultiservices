import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/servicces/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, getDoc } from "firebase/firestore";

interface User {
  id?: string;
  name: string;
  password?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  users: User[];
}

const initialState: AuthState = {
  user: null,
  users: []
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ name, password }: { name: string; password: string }) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("name", "==", name), where("password", "==", password));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const firstDocId = querySnapshot.docs[0].id;
      const docRef = doc(db, 'users', firstDocId); // Référence du document par ID  
      const docSnap = await getDoc(docRef);

      // Récupération des données du document  
      const userData = docSnap.data(); // Récupérez les données ici  

      if (userData) {
        // Stocker l'ID et le nom dans localStorage  
        localStorage.setItem("id", docSnap.id);
        localStorage.setItem("name", userData.name); 
        localStorage.setItem("role", userData.role); 
        return {name: userData.name, id: docSnap.id, role: userData.role};
      }

      
    }

    throw new Error("Identifiants incorrects");
  }
);
export const createUser = createAsyncThunk("auth/createUser", async (user: User) => {
  const usersRef = collection(db, "users");
  const docRef = await addDoc(usersRef, user);
  return { ...user, id: docRef.id };
});

export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
});

export const fetchUserById = createAsyncThunk("auth/fetchUserById", async (id: string) => {
  const userRef = doc(db, "users", id);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() } as User;
  }
  throw new Error("Utilisateur non trouvé");
});

export const updateUser = createAsyncThunk("auth/updateUser", async (user: User) => {
  if (!user.id) throw new Error("User ID is required");
  const userRef = doc(db, "users", user.id);
  const { id, ...updateData } = user;
  await updateDoc(userRef, updateData);
  return user;
});

export const deleteUser = createAsyncThunk("auth/deleteUser", async (id: string) => {
  const userRef = doc(db, "users", id);
  await deleteDoc(userRef);
  return id;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("id")
      localStorage.removeItem("name")
      localStorage.removeItem("role")
    },
    currentUser: (state) => {
      state.user = {
        id: localStorage.getItem("id") || "", 
        name: localStorage.getItem("name") || "", 
        role: localStorage.getItem("role") || ""}
    },
    checkUser: (state) => {  
      const id = localStorage.getItem("id");  
      const name = localStorage.getItem("name");  
      const role = localStorage.getItem("role");  
      if (id && name && role) {  
        state.user = { id, name, role };  
      } else {  
        state.user = null;  
      }  
    }  
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        const existingUser = state.users.find(user => user.id === action.payload.id);
        if (!existingUser) {
          state.users.push(action.payload);
        }
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  }
});

export const { logout, currentUser, checkUser } = authSlice.actions;
export default authSlice.reducer;

