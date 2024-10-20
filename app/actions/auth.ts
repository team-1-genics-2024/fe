'use server';

export type SignUpResponse = {
  success: boolean;
  error: string;
};


export type LoginResponse = {
  success: boolean;
  error: string;
  // token?: string;
};

// -- SIGN UP --
export async function signupAction(prevState: SignUpResponse, formData: FormData): Promise<SignUpResponse> {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!name || !email || !password) {
      return {
        success: false,
        error: 'All fields are required',
      };
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiBaseUrl}api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseData = await response.json();
    console.log('Raw Response:', responseData);

    if (Array.isArray(responseData) && responseData[1]?.success === false) {
      return {
        success: false,
        error: responseData[1].error || 'Registration failed',
      };
    }

    if (responseData.success === false) {
      return {
        success: false,
        error: responseData.error || 'Registration failed',
      };
    }

    return {
      success: true,
      error: '',
    };

  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}


// -- LOG IN --
export async function loginAction(
  prevState: LoginResponse,
  formData: FormData
): Promise<LoginResponse> {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return {
        success: false,
        error: 'Email and password are required',
      };
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiBaseUrl}api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseData = await response.json();
    console.log('Raw Response:', responseData);

    if (responseData.success === false) {
      return {
        success: false,
        error: responseData.error || 'Login failed',
      };
    }

    return {
      success: true,
      error: '',
      // token: responseData.token, // include the token if present
    };

  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}


