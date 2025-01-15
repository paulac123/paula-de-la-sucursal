const API = 'https://youtube-v31.p.rapidapi.com/search?part=snippet&channelId=UC5UZGL_l1sx_U--kZA5Lq6A&order=date&maxResults=9';

const content = null || document.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "179682e4fcmshf357a5ed2d11353p1e2c57jsnd50efc692e76",
    "x-rapidapi-host": "youtube-v31.p.rapidapi.com"
  }
};

// Función para obtener los datos de la API
async function fetchData(urlApi) {
  try {
    const response = await fetch(urlApi, options);
    
    // Asegurémonos de que la respuesta esté bien antes de convertirla
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

// Función principal para cargar los videos
(async () => {
  try {
    const videoData = await fetchData(API);

    // Si los datos no se cargan correctamente, mostramos un mensaje de error
    if (!videoData || !videoData.items) {
      content.innerHTML = '<p>No se pudieron cargar los videos.</p>';
      return;
    }

    // Crear el contenido HTML a partir de los datos
    const view = videoData.items.map(item => {
      // Asegurarnos de que el 'videoId' exista en la respuesta
      const videoId = item.id.videoId || item.id;

      return `
        <div class="group relative">
          <div class="w-full bg-gray-200 aspect-w-16 aspect-h-9 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
              <img src="${item.snippet.thumbnails.high.url}" alt="${item.snippet.title}" class="w-full">
            </a>
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${item.snippet.title}
            </h3>
          </div>
        </div>
      `;
    }).slice(0, 4).join("");

    // Asignar el HTML generado al contenedor
    content.innerHTML = view;

  } catch (error) {
    console.log('Error en la función principal:', error);
  }
})();
