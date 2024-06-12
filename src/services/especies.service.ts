import axios from "axios";

export async function getEspecies() {
  const response = await axios.get<TEspecie[]>(
    // toma el valor de .env.local
    // resulta en http://localhost:3000/especies
    `${process.env.EXPO_PUBLIC_API_URL}/especies`
  );
  return response.data;
}

export async function sendReport( reporte: TReporte ) {
  const formData = new FormData()

  formData.append("sp_id", reporte.sp_id.toString())
  formData.append("fecha", reporte.fecha.toDateString())
  // formData.append("hora", reporte.hora.toLocalTimeString())
  formData.append("latitud", reporte.latitud.toString())
  formData.append("longitud", reporte.longitud.toString())
  formData.append("descripcion", reporte.descripcion.toString())
}

export interface TEspecie {
  sp_id: number;
  reino: TReino;
  phydiv: string | null;
  clase: string;
  orden: string;
  familia: string;
  nombre_cientifico: string;
  origen: string;
  imagen: null | string;
  likes: number;
}

interface TReporte {
  sp_id: number,
  fecha: Date,
  hora: Date,
  latitud: number,
  longitud: number,
  descripcion: string,
  imagen: null,
}

export const TReinoEnum = {
  ANIMALIA: "ANIMALIA",
  PLANTAE: "PLANTAE",
  FUNGI: "FUNGI",
} as const;
export type TReino = (typeof TReinoEnum)[keyof typeof TReinoEnum];

// ===========
// SIN AXIOS
// ===========
// export async function getEspecies() {
//   try {
//     const response = await fetch("http://localhost:3000/especies");
//     if (!response.ok) {
//       let error = new CustomError("HTTP error, status = " + response.status);
//       error.response = response;
//       throw error;
//     }
//     const data: TEspecie[] = await response.json();
//     return data;
//   } catch (error) {
//     if (error instanceof CustomError) {
//       console.error("ERROR", error?.response);
//     }
//     throw error;
//   }
// }

// class CustomError extends Error {
//   public response: Response | undefined;
// }
