// import { UserStatus } from "../../../generated/prisma/enums";
// import { auth } from "../../lib/auth";

// interface IRegisterPatientPayload {
//   name: string;
//   email: string;
//   password: string;
// }

// const registerPatient = async (payload: IRegisterPatientPayload) => {
//   const { name, email, password } = payload;

//   const data = await auth.api.signUpEmail({
//     body: {
//       name,
//       email,
//       password,
//     },
//   });

//   if (!data.user) {
//     throw new Error("User registration failed");
//   }

//   return data;
// };

// interface ILoginUserPayload {
//   email: string;
//   password: string;
// }

// const loginUser = async (payload: ILoginUserPayload) => {
//   const { email, password } = payload;

//   const data = await auth.api.signInEmail({
//     body: {
//       email,
//       password,
//     },
//   });

//   if (data.user.status === UserStatus.BLOCKED) {
//     throw new Error("User is blocked");
//   }

//   if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
//     throw new Error("User is deleted");
//   }

//   return data;
// };

// export const AuthService = {
//   registerPatient,
//   loginUser,
// };

import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

const registerPatient = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const { headers, response } = await auth.api.signUpEmail({
    body: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    },
    returnHeaders: true,
  });

  if (!response.user) {
    throw new Error("User registration failed");
  }

  const patient = await prisma.$transaction(async (tx) => {
    const patientTx = await tx.patient.create({
      data: {
        userId: response.user.id,
        name: payload.name,
        email: payload.email,
      },
    });

    return patientTx;
  });

  return { headers, data: response, patient };
};

const loginUser = async (payload: { email: string; password: string }) => {
  const { headers, response } = await auth.api.signInEmail({
    body: {
      email: payload.email,
      password: payload.password,
    },
    returnHeaders: true,
  });

  return { headers, data: response };
};

export const AuthService = { registerPatient, loginUser };
