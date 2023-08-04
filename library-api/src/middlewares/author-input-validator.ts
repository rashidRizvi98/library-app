import { body } from "express-validator";

export const authorCreationInputValidator = ()=> {
    return [
    body('firstName')
      .isLength({ min: 3 })
      .withMessage('First name must be at least 3 char long')
      .isLength({ max: 20 })
      .withMessage('First name can be maximum 20 char long')
      .exists()
      .withMessage('First name is required')
      .trim()
      .escape(),
    body('lastName')
      .isLength({ min: 3 })
      .withMessage('Last name must be at least 3 char long')
      .isLength({ max: 20 })
      .withMessage('Last name can be maximum 20 char long')
      .exists()
      .withMessage('Last name is required')
      .trim()
      .escape(),

  ];
};