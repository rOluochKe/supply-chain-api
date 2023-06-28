import { validate, ValidationError } from 'class-validator';

export const validateObject = async (object: any): Promise<ValidationError[]> => {
  return await validate(object);
};

export const extractValidationErrors = (errors: ValidationError[]): { [key: string]: string } => {
  const errorMessages: { [key: string]: string } = {};
  errors.forEach((error: ValidationError) => {
    Object.entries(error.constraints || {}).forEach(([constraintName, constraint]) => {
      const property = error.property;
      errorMessages[property] = constraint;
    });
  });
  return errorMessages;
};
