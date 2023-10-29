import nodemailer from 'nodemailer';

const enviarCorreo = (estado) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'heehee.proyects@gmail.com',
          pass: process.env.TOKEN_MAIL,
        },
      });

      let asunto = '';
      let contenido = '';
    
      // Personaliza el asunto y el contenido del correo en función del estado
      if (estado === 'aprobado') {
        asunto = 'Solicitud Aprobada';
        contenido = 'La solicitud ha sido aprobada.';
      } else if (estado === 'en espera de cambios') {
        asunto = 'Solicitud en Espera de Cambios';
        contenido = 'La solicitud está en espera de cambios.';
      } else if (estado === 'rechazado') {
        asunto = 'Solicitud Rechazada';
        contenido = 'La solicitud ha sido rechazada.';
      }

      const mailOptions = {
        from: 'permisos_municipalidad <permisos_municipalidad@gmail.com>',
        to: 'bayron2000inf@gmail.com',
        subject: asunto,
        text: contenido,
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
