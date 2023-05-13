import { Request } from "express";
import { validationResult, matchedData } from "express-validator";

const checkError = async (req: Request) => {
  const err = validationResult(req).array();
  if (err.length) throw { status: 400, error: err };
  return matchedData(req);
};

export default checkError;
