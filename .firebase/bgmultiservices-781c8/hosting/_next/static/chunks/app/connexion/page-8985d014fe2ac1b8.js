(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[106],{24049:(e,r,a)=>{Promise.resolve().then(a.bind(a,31557))},31557:(e,r,a)=>{"use strict";a.r(r),a.d(r,{default:()=>o});var t=a(95155),s=a(12115),l=a(83391),d=a(81654);function o(){let[e,r]=(0,s.useState)(""),[a,o]=(0,s.useState)(""),i=(0,l.wA)(),u=async r=>{r.preventDefault();try{await i((0,d.Lx)({name:e,password:a})).unwrap()?window.location.href="/":console.error("Identifiants incorrects")}catch(e){console.error("Erreur de connexion :",e)}};return(0,t.jsx)("div",{className:"flex justify-center items-center h-screen",style:{backgroundImage:"url('/images/bg.jpg')",backgroundSize:"cover",backgroundPosition:"center"},children:(0,t.jsxs)("div",{className:"w-[300px] p-6 border-[1px] border-gray-300 rounded-lg",children:[(0,t.jsx)("h2",{className:"text-2xl text-white bg-gray-800 rounded-lg p-2 mb-4",children:"Connexion"}),(0,t.jsxs)("form",{onSubmit:u,children:[(0,t.jsx)("input",{type:"text",placeholder:"Votre nom",className:"block pl-2 border-[1px] border-gray-300 w-full rounded-lg h-[35px] mb-2",onChange:e=>r(e.target.value)}),(0,t.jsx)("input",{type:"password",placeholder:"Mot de passe",className:"block pl-2 border-[1px] border-gray-300 w-full rounded-lg h-[35px]",onChange:e=>o(e.target.value)}),(0,t.jsx)("button",{type:"submit",className:"px-[10px] py-[3px] rounded-lg bg-blue-400 my-2 text-gray-100",children:"Se connecter"})]})]})})}},81654:(e,r,a)=>{"use strict";a.d(r,{Ay:()=>b,Lx:()=>d,Ny:()=>g,hG:()=>c,hU:()=>i,kg:()=>o,ri:()=>p});var t=a(48943),s=a(75033),l=a(27058);let d=(0,t.zD)("auth/loginUser",async e=>{let{name:r,password:a}=e,t=(0,l.rJ)(s.db,"users"),d=(0,l.P)(t,(0,l._M)("name","==",r),(0,l._M)("password","==",a)),o=await (0,l.GG)(d);if(!o.empty){let e=o.docs[0].id,r=(0,l.H9)(s.db,"users",e),a=await (0,l.x7)(r),t=a.data();if(t)return localStorage.setItem("id",a.id),localStorage.setItem("name",t.name),localStorage.setItem("role",t.role),{name:t.name,id:a.id,role:t.role}}throw Error("Identifiants incorrects")}),o=(0,t.zD)("auth/createUser",async e=>{let r=(0,l.rJ)(s.db,"users"),a=await (0,l.gS)(r,e);return{...e,id:a.id}}),i=(0,t.zD)("auth/fetchUsers",async()=>{let e=(0,l.rJ)(s.db,"users");return(await (0,l.GG)(e)).docs.map(e=>({id:e.id,...e.data()}))}),u=(0,t.zD)("auth/fetchUserById",async e=>{let r=(0,l.H9)(s.db,"users",e),a=await (0,l.x7)(r);if(a.exists())return{id:a.id,...a.data()};throw Error("Utilisateur non trouv\xe9")}),n=(0,t.zD)("auth/updateUser",async e=>{if(!e.id)throw Error("User ID is required");let r=(0,l.H9)(s.db,"users",e.id),{id:a,...t}=e;return await (0,l.mZ)(r,t),e}),c=(0,t.zD)("auth/deleteUser",async e=>{let r=(0,l.H9)(s.db,"users",e);return await (0,l.kd)(r),e}),m=(0,t.Z0)({name:"auth",initialState:{user:null,users:[]},reducers:{logout:e=>{e.user=null,localStorage.removeItem("id"),localStorage.removeItem("name"),localStorage.removeItem("role")},currentUser:e=>{e.user={id:localStorage.getItem("id")||"",name:localStorage.getItem("name")||"",role:localStorage.getItem("role")||""}},checkUser:e=>{let r=localStorage.getItem("id"),a=localStorage.getItem("name"),t=localStorage.getItem("role");r&&a&&t?e.user={id:r,name:a,role:t}:e.user=null}},extraReducers:e=>{e.addCase(d.fulfilled,(e,r)=>{e.user=r.payload}).addCase(i.fulfilled,(e,r)=>{e.users=r.payload}).addCase(u.fulfilled,(e,r)=>{e.users.find(e=>e.id===r.payload.id)||e.users.push(r.payload)}).addCase(o.fulfilled,(e,r)=>{e.users.push(r.payload)}).addCase(n.fulfilled,(e,r)=>{let a=e.users.findIndex(e=>e.id===r.payload.id);-1!==a&&(e.users[a]=r.payload)}).addCase(c.fulfilled,(e,r)=>{e.users=e.users.filter(e=>e.id!==r.payload)})}}),{logout:p,currentUser:g,checkUser:h}=m.actions,b=m.reducer},75033:(e,r,a)=>{"use strict";a.d(r,{db:()=>d});var t=a(49904),s=a(27058);let l=(0,t.Wp)({apiKey:"AIzaSyASZSWBGwPJYuQDRi1GObaNtrccuaBfu70",authDomain:"bgmultiservices-781c8.firebaseapp.com",projectId:"bgmultiservices-781c8",messagingSenderId:"749311417727",appId:"1:749311417727:web:3ea8698ba8ac3ac7ac8e4a"}),d=(0,s.aU)(l)}},e=>{var r=r=>e(e.s=r);e.O(0,[992,876,441,517,358],()=>r(24049)),_N_E=e.O()}]);