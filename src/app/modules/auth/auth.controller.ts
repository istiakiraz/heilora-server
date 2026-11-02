// import { Request, Response } from "express";
// import { catchAsync } from "../../shared/catchAsync";
// import { AuthService } from "./auth.service";
// import { sendResponse } from "../../shared/sendResponse";

// const registerPatient = catchAsync(async (req: Request, res: Response) => {
//   const payload = req.body;

//   const result = await AuthService.registerPatient(payload);
//   sendResponse(res, {
//     statusCode: 201,
//     success: true,
//     message: "Patient registered successfully",
//     data: result,
//   });
// });

// const loginUser = catchAsync(async (req: Request, res: Response) => {
//   const payload = req.body;

//   const result = await AuthService.loginUser(payload);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "User logged in successfully",
//     data: result,
//   });

// })

// export const AuthController = {
//   registerPatient,
//   loginUser
// };



import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";

const setAuthCookies = (res: Response, headers: Headers) => {
  const cookies = headers.getSetCookie();
  if (cookies.length) {
    res.setHeader("Set-Cookie", cookies);
  }
};

const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const { headers, data, patient } = await AuthService.registerPatient(req.body);

  setAuthCookies(res, headers);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient registered successfully",
    data: { ...data, patient },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { headers, data } = await AuthService.loginUser(req.body);

  setAuthCookies(res, headers);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data,
  });
});

export const AuthController = {
  registerPatient,
  loginUser,
};