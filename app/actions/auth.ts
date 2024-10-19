'use server'

export interface AuthResponse {
  success: boolean;
  error?: string;
}

export async function signupAction(prevState: AuthResponse, formData: FormData): Promise<AuthResponse> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  // Check for existing emails (In production, this would be a DB query)
  const existingEmails = ["test@example.com", "user@example.com"];
  
  if (existingEmails.includes(email)) {
    return {
      success: false,
      error: "You already have an account with that email address. Try to log in instead."
    };
  }

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return {
      success: true
    };
  } catch (error) {
    return {
      success: false,
      error: 'Signup failed. Please try again.'
    };
  }
}