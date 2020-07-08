interface IMailConfig {
  driver: 'ses' | 'ethereal';

  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: 'Caique Ribeiro',
      email: 'ribeiro.caique95@gmail.com',
    },
  },
} as IMailConfig;
