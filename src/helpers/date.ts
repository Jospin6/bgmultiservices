export const parseISODate = (isoDate: string) => {
    const date = new Date(isoDate); // Convertit la date ISO en un objet Date
    return date;
}