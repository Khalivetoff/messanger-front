export const cookies = {
  getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift();
    }
  },
  setCookie(name: string, val: string, expiration?: number): void {
    let cookie = `${name}=${val};`;
    if (expiration !== undefined && expiration !== null) {
      const now = new Date();
      const date = now.setTime(now.getTime() + expiration);
      cookie += ` expires=${date};`;
    }
    cookie += ' path=/';
    document.cookie = cookie;
  },
};
