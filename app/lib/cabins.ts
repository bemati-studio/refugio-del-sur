export const cabins = [
  { id: "bosque", name: "Refugio Bosque", guests: 2, bedrooms: 1, price: 115000, description: "Un refugio íntimo bajo los coigües, pensado para dos.", features: ["Tinaja privada", "Cama king", "Desayuno incluido"] },
  { id: "lago", name: "Refugio Lago", guests: 4, bedrooms: 2, price: 148000, description: "Vistas abiertas al agua y una terraza para alargar la tarde.", features: ["Vista panorámica", "Terraza cubierta", "Cocina equipada"] },
  { id: "familia", name: "Casa Arrayán", guests: 6, bedrooms: 3, price: 185000, description: "Amplitud y calidez para compartir el sur en familia.", features: ["Estufa a leña", "Quincho privado", "Tres dormitorios"] },
] as const;
export const getCabin = (id: string) => cabins.find(cabin => cabin.id === id);
