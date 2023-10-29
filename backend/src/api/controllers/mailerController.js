import nodemailer from 'nodemailer';

const enviarCorreo = () => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'heehee.proyects@gmail.com',
          pass: 'enfq krfc ymaa whpp',
        },
      });

      const mailOptions = {
        from: 'permisos_municipalidad <permisos_municipalidad@gmail.com>',
        to: 'bayron2000inf@gmail.com',
        subject: 'prueba',
        text: 'Contenido del correo en texto plano',
        //html: '<p>Contenido del correo en formato HTML</p>', // Si quieres enviar un correo en HTML
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo:', error);
        } else {
          console.log('Correo enviado:', info.response);
        }
      });
}

export default enviarCorreo;
