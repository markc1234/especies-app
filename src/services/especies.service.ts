export async function getEspecies() {
  const response = await fetch("http://localhost:3000/especies");
  if (!response.ok) {
    throw new Error("HTTP error, status = " + response.status);
  }
  const data: Especie[] = await response.json();
  return data;
}

export interface Especie {
  sp_id: number;
  reino: string;
  phydiv: null;
  clase: string;
  orden: string;
  familia: string;
  nombre_cientifico: string;
  origen: string;
  imagen: null | string;
  likes: number;
}
