const pause = (ms: number): Promise<void> => new Promise((res) => { setTimeout(res, ms); });

const takenEmails = ['admin@gmail.com', 'user1@gmail.com'];

const demoCheckEmail = async (email: string): Promise<boolean> => {
  await pause(150);

  return !takenEmails.includes(email);
};

const AuthService = {
  demoCheckEmail,
};

export default AuthService;
