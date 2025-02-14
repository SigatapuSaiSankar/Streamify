import validator from 'validator';

const ValidateEmail = async (req, res, next) => {
    const { email } = req.body;

    try {
        const validationResult = validator.isEmail(email);

        if (!validationResult) {
            return res.status(400).send({
                message: 'The email you are using in Invalid!',
                success: false,
                reason: validationResult.reason
            });
        }
        next();
        // return res.status(200).send({ message: "Valid email", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server error Validating email", success: false });
    }
}

export { ValidateEmail }