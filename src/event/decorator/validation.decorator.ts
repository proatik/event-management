import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function MaxAttendeesValidation(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "MaxAttendeesValidation",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value === undefined || value === null) {
            return false;
          }

          const parsedValue = Number(value);

          if (isNaN(parsedValue)) {
            return false;
          }

          if (parsedValue < 1) {
            return false;
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const value = args.object[args.property];
          const parsedValue = Number(value);

          if (isNaN(parsedValue) || typeof value !== "number") {
            return `${args.property} must be a valid number`;
          }

          return `${args.property} must not be less than 1`;
        },
      },
    });
  };
}

export function DateValidation(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "FutureDateValidation",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const date = new Date(value);
          const isValidDate = !isNaN(date.getTime());

          if (!isValidDate) {
            return false;
          }

          return date > new Date();
        },
        defaultMessage(args: ValidationArguments) {
          const value = args.object[args.property];
          const date = new Date(value);

          const isValidDate = !isNaN(date.getTime());

          if (!isValidDate) {
            return `${args.property} must be a valid ISO 8601 date string`;
          }

          return `${args.property} must be in the future`;
        },
      },
    });
  };
}
