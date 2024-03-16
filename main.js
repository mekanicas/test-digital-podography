// Función para cargar la imagen
function cargarImagen(file) {
    const reader = new FileReader();
    reader.onload = function() {
      const img = new Image();
      img.onload = function() {
        // Procesar la imagen
        const nuevaImagen = generarMapaDistancia(img, puntoReferencia);
        document.getElementById('resultado').appendChild(nuevaImagen);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
  
  // Función para calcular la distancia relativa
  function calcularDistancia(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  // Función para generar la nueva imagen
  function generarMapaDistancia(img, puntoReferencia) {
    const nuevaImagen = document.createElement('canvas');
    nuevaImagen.width = img.width;
    nuevaImagen.height = img.height;
    const ctx = nuevaImagen.getContext('2d');
    const imgData = ctx.getImageData(0, 0, img.width, img.height);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const x = i / 4 % img.width;
      const y = Math.floor(i / 4 / img.width);
      const distancia = calcularDistancia(x, y, puntoReferencia.x, puntoReferencia.y);
      const color = obtenerColorDistancia(distancia);
      imgData.data[i] = color.r;
      imgData.data[i + 1] = color.g;
      imgData.data[i + 2] = color.b;
    }
    ctx.putImageData(imgData, 0, 0);
    return nuevaImagen;
  }
  
  // Función para obtener un color basado en la distancia
  function obtenerColorDistancia(distancia) {
    const rojo = Math.floor(255 * (1 - distancia));
    const verde = Math.floor(255 * distancia);
    return { r: rojo, g: verde, b: 0 };
  }
  
  // Función para descargar la imagen
  function descargarImagen(imagen) {
    const enlace = document.createElement('a');
    enlace.href = imagen.toDataURL();
    enlace.download = 'mapaDistancia.jpg';
    enlace.click();
  }
  
  // Función principal
  function main() {
    const inputImagen = document.getElementById('imagen');
    inputImagen.addEventListener('change', (e) => {
      const file = e.target.files[0];
      cargarImagen(file);
    });
  
    const puntoReferencia = { x: 100, y: 100 }; // Ajustar según la imagen
  
    const botonGenerar = document.getElementById('generar');
    botonGenerar.addEventListener('click', () => {
      const img = document.getElementById('imagen');
      const nuevaImagen = generarMapaDistancia(img, puntoReferencia);
      document.getElementById('resultado').appendChild(nuevaImagen);
    });
  
    const botonDescargar = document.getElementById('descargar');
    botonDescargar.addEventListener('click', () => {
      const img = document.getElementById('resultado').firstElementChild;
      descargarImagen(img);
    });
  }
  
  main();
  