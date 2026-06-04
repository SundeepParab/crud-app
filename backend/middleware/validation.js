const { body, validationResult } =
    require("express-validator");

exports.userValidation = [

    body("name")
        .notEmpty(),

    body("mobile")
        .matches(/^[0-9]{10}$/),

    body("email")
        .isEmail(),

    (req, res, next) => {

        const errors =
            validationResult(req);

        if (!errors.isEmpty())
            return res.status(400)
                .json(errors.array());

        next();
    }
];