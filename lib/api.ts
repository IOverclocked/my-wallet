import { NextRequest, NextResponse } from "next/server";

function success(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

function clientError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function serverError() {
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}

export function withErrorHandling(handler: (req: NextRequest, context?: any) => Promise<Response>) {
  return async (req: NextRequest, context?: any) => {
    try {
      return await handler(req, context);
    } catch (err) {
      console.error("API Error:", err);
      return serverError();
    }
  };
}

// TODO: TEST crud expense

export const api = {
  success,
  clientError,
  serverError,
  withErrorHandling,
};
