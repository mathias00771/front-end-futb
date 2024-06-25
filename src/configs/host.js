const getHost = () => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      const urlObj = new URL(url);
      return urlObj.hostname;
    }
    return 'localhost';
  };

export const host = getHost()