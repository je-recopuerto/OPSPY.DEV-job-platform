// Source: https://joulev.dev/blogs/throwing-expected-errors-in-react-server-actions
export type ServerActionResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };

export class ServerActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerActionError";
  }
}

export function createServerAction<Return, Args extends unknown[] = []>(
  callback: (...args: Args) => Promise<Return>,
): (...args: Args) => Promise<ServerActionResult<Return>> {
  return async (...args: Args) => {
    try {
      const value = await callback(...args);
      return { success: true, value };
    } catch (error) {
      if (error instanceof ServerActionError)
        return { success: false, error: error.message };
      throw error;
    }
  };
}
