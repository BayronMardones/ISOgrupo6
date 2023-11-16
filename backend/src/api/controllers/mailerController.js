import nodemailer from 'nodemailer';

const enviarCorreo = (solicitud, usuario) => {
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
      if (solicitud.estado === 'aprobado') {
        asunto = 'Solicitud Aprobada'; //agregar usuarios + usuario.nombre
        contenido = 'La solicitud ha sido aprobada.';
      } else if (solicitud.estado === 'pendiente') {
        asunto = 'Solicitud en Espera de Cambios';
        contenido = 'La solicitud está en espera de cambios.';
      } else if (solicitud.estado === 'rechazado') {
        asunto = 'Solicitud Rechazada';
        contenido = 'La solicitud ha sido rechazada.';
      } 

      const mailOptions = {
        from: 'permisos_municipalidad <permisos_municipalidad@gmail.com>',
        to: usuario.email,
        subject: asunto,
        text: contenido,
    
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo:', error);
        } 
      });
}

export default enviarCorreo;
