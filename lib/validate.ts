export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return "Name is required";
  }
  if (name.length < 2) {
    return "Name must be at least 2 characters long";
  }
  if (name.length > 50) {
    return "Name must be less than 50 characters";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  return null;
};

export const validateQuizInput = (quiz: {
  title: string;
  description: string;
  questions: any[];
}): string[] => {
  const errors: string[] = [];

  if (!quiz.title.trim()) {
    errors.push("Title is required");
  } else if (quiz.title.length < 3) {
    errors.push("Title must be at least 3 characters long");
  } else if (quiz.title.length > 100) {
    errors.push("Title must be less than 100 characters");
  }

  if (!quiz.description.trim()) {
    errors.push("Description is required");
  } else if (quiz.description.length < 10) {
    errors.push("Description must be at least 10 characters long");
  } else if (quiz.description.length > 500) {
    errors.push("Description must be less than 500 characters");
  }

  if (!quiz.questions.length) {
    errors.push("At least one question is required");
  }

  quiz.questions.forEach((question, index) => {
    if (!question.text.trim()) {
      errors.push(`Question ${index + 1} text is required`);
    } else if (question.text.length < 3) {
      errors.push(
        `Question ${index + 1} text must be at least 3 characters long`
      );
    } else if (question.text.length > 500) {
      errors.push(
        `Question ${index + 1} text must be less than 500 characters`
      );
    }

    if (!Array.isArray(question.options) || question.options.length < 2) {
      errors.push(`Question ${index + 1} must have at least 2 options`);
    } else {
      question.options.forEach((option: string, optIndex: number) => {
        if (!option.trim()) {
          errors.push(
            `Option ${optIndex + 1} in question ${index + 1} cannot be empty`
          );
        }
        if (option.length > 200) {
          errors.push(
            `Option ${optIndex + 1} in question ${
              index + 1
            } must be less than 200 characters`
          );
        }
      });

      const uniqueOptions = new Set(question.options);
      if (uniqueOptions.size !== question.options.length) {
        errors.push(`Question ${index + 1} has duplicate options`);
      }
    }

    if (
      question.correctOption === undefined ||
      question.correctOption === null
    ) {
      errors.push(`Question ${index + 1} must have a correct answer selected`);
    } else if (question.correctOption >= question.options.length) {
      errors.push(
        `Question ${index + 1} has an invalid correct answer selected`
      );
    }
  });

  return errors;
};

export const validateQuizSubmission = (
  answers: number[],
  totalQuestions: number
): string | null => {
  if (!Array.isArray(answers)) {
    return "Invalid submission format";
  }

  if (answers.length !== totalQuestions) {
    return "All questions must be answered";
  }

  if (answers.some((answer) => answer === -1)) {
    return "All questions must be answered";
  }

  return null;
};
