export const prerender = false;

export async function POST({ request }: { request: Request }) {
  console.log('Received request to save data to Google Sheets', request);

  let body;
  try {
    body = await request.json();
  } catch (err) {
    return new Response('JSON inválido', { status: 400 });
  }

  // Adaptar a los nombres enviados por el frontend
  const { fullName, email, phone } = body || {};
  if (!fullName || !email) {
    return new Response('Faltan datos requeridos', { status: 400 });
  }

  // Puedes enviar phone como mensaje o como campo extra
  const response = await fetch(
    'https://script.google.com/macros/s/AKfycbxtXO7i4uTdAAy6-2fDu-c9W9UZBMQvdNQdOKOayiGBd2o5ZGA9-Q41myDL0tLbZl2_kA/exec',
    {
      method: 'POST',
      body: JSON.stringify({ nombre: fullName, correo: email, mensaje: phone }),
      headers: { 'Content-Type': 'application/json' },
    }
  );

  let errorText = '';
  if (!response.ok) {
    try {
      errorText = await response.text();
    } catch (e) {
      errorText = 'Error desconocido';
    }
    return new Response('Error al guardar en Google Sheets: ' + errorText, { status: 500 });
  }

  return new Response('Guardado correctamente', { status: 200 });
}
