// --------------------- VARIABLES GLOBALES ---------------------
const inicioScreen = document.getElementById('inicio');
const rolesScreen = document.getElementById('roles');
const nombresScreen = document.getElementById('nombres');
const turnosScreen = document.getElementById('turnos');
const narradorScreen = document.getElementById('narrador');

const siguienteNumJugadores = document.getElementById('siguienteNumJugadores');
const siguienteRoles = document.getElementById('siguienteRoles');
const siguienteNombres = document.getElementById('siguienteNombres');

const nombresListDiv = document.getElementById('nombresList');
const turnoJugador = document.getElementById('turnoJugador');
const verRolBtn = document.getElementById('verRolBtn');
const rolJugadorDiv = document.getElementById('rolJugador');
const nombreRolH2 = document.getElementById('nombreRol');
const descripcionRolP = document.getElementById('descripcionRol');
const siguienteJugadorBtn = document.getElementById('siguienteJugador');
const menuNarradorBtn = document.getElementById('menuNarradorBtn');

const contadorDiasSpan = document.getElementById('contadorDias');
const listaJugadoresNarrador = document.getElementById('listaJugadoresNarrador');
const comenzarJuegoBtn = document.getElementById('comenzarJuego');
const volverTurnosBtn = document.getElementById('volverTurnos');

const volverInicioBtn = document.getElementById('volverInicio');
const volverRolesBtn = document.getElementById('volverRoles');

// Elementos Modo Vidente
const abrirVidenteBtn = document.getElementById('abrirVidenteBtn');
const seleccionarJugadorVidente = document.getElementById('seleccionarJugadorVidente');
const verRolVidenteBtn = document.getElementById('verRolVidenteBtn');

// Modal Vidente
const modalVidente = document.getElementById('modalVidente');
const nombreRolVidente = document.getElementById('nombreRolVidente');
const descripcionRolVidente = document.getElementById('descripcionRolVidente');
const cerrarVidenteBtn = document.getElementById('cerrarVidenteBtn');

// Registro de muertes
const abrirMuerteBtn = document.getElementById('abrirMuerteBtn');
const modalMuerte = document.getElementById('modalMuerte');
const cerrarMuerteBtn = document.getElementById('cerrarMuerteBtn');
const asesinoSelect = document.getElementById('asesinoSelect');
const victimaSelect = document.getElementById('victimaSelect');
const registrarMuerteBtn = document.getElementById('registrarMuerteBtn');

// Historial y resumen
const abrirHistorialBtn = document.getElementById('abrirHistorialBtn');
const modalHistorial = document.getElementById('modalHistorial');
const cerrarHistorialBtn = document.getElementById('cerrarHistorialBtn');
const historialDiv = document.getElementById('historial');
const resumenFinalDiv = document.getElementById('resumenFinal');

// Mini chat narrador
const abrirChatNarradorBtn = document.getElementById('abrirChatNarradorBtn');
const modalChatNarrador = document.getElementById('modalChatNarrador');
const cerrarChatBtn = document.getElementById('cerrarChatBtn');
const enviarChatBtn = document.getElementById('enviarChatBtn');
const chatInput = document.getElementById('chatInput');
const chatMensajes = document.getElementById('chatMensajes');

// Botón reiniciar partida
const reiniciarPartidaBtn = document.getElementById('reiniciarPartidaBtn');

// Notas Jugador
const modalNotas = document.getElementById('modalNotas');
const cerrarNotasBtn = document.getElementById('cerrarNotasBtn');
const textoNotas = document.getElementById('textoNotas');
const guardarNotasBtn = document.getElementById('guardarNotasBtn');
const tituloNotas = document.getElementById('tituloNotas');
let jugadorNotaActual = -1; // Índice del jugador actual editando nota

// Modal Confirmación Narrador
const modalConfirmarNarrador = document.getElementById('modalConfirmarNarrador');
const confirmarNarradorBtn = document.getElementById('confirmarNarradorBtn');
const cancelarNarradorBtn = document.getElementById('cancelarNarradorBtn');

// Categorías Roles
const catLobosDiv = document.getElementById('cat-lobos');
const catAldeanosDiv = document.getElementById('cat-aldeanos');
const catAmbiguosDiv = document.getElementById('cat-ambiguos');
const totalRolesCountSpan = document.getElementById('totalRolesCount');
const targetRolesCountSpan = document.getElementById('targetRolesCount');

// --------------------- VARIABLES DE PARTIDA ---------------------
let numJugadores = 0;
let rolesSeleccionados = [];
let nombresJugadores = [];
let turnos = [];
let currentTurn = 0;
let jugadoresEstado = [];
let dia = 1;
let historial = [];
let jugadoresNotas = {}; // Objeto para guardar notas por índice de jugador

// --------------------- CONFIGURACIÓN ROLES ---------------------
const rolesConfig = {
    lobos: ["Lobo", "Lobo Infectador", "El Lobo feroz", "El hombre Lobo Albino"],
    aldeanos: ["Aldeano", "Vidente", "Protector", "Bruja", "Cazador", "La niña", "Cúpido", "El tonto del pueblo", "Anciano", "Cabeza de turco", "El Caballero de la espada oxidada", "Juez Tartamudo", "El Zorro", "El Domador de Osos"],
    ambiguos: ["Niño salvaje", "Perro Lobo", "La Sirvienta", "Ángel"],
};

const rolesDescripcion = {
    "Lobo": "Tu objetivo es eliminar a los aldeanos. Actúas de noche y eliges a quién atacar.",
    "Lobo Infectador": "Tu objetivo es eliminar a los aldeanos y puedes infectar a un ciudadano.",
    "Vidente": "Cada noche puedes descubrir el rol de un jugador.",
    "Protector": "Puedes proteger a un jugador de ser atacado por los lobos.",
    "Bruja": "Tienes una poción para salvar a alguien y otra para eliminar.",
    "Cazador": "Si mueres, puedes eliminar a un jugador inmediatamente.",
    "Aldeano": "No tienes habilidades especiales, pero participa en las votaciones.",
    "La niña": "Puedes espiar a los lobos durante la noche entreabriendo los ojos.",
    "Cúpido": "En la primera noche, enamoras a dos jugadores. Si uno muere, el otro también.",
    "El tonto del pueblo": "Si el pueblo vota para lincharte, se revela tu rol y no mueres, pero pierdes el voto.",
    "Anciano": "Sobrevives al primer ataque de los lobos. Si te linchan, todos pierden sus poderes.",
    "Cabeza de turco": "Si hay empate en las votaciones, tú mueres automáticamente.",
    "Niño salvaje": "Eliges una persona modelo. Si el modelo muere, te conviertes en Lobo.",
    "Perro Lobo": "Al principio eliges si quieres ser Aldeano o Lobo.",
    "La Sirvienta": "Puede quedarse la carta de un jugador linchado por la votación de la aldea",
    "El Caballero de la espada oxidada": "Si el caballero es devorado, uno de los lobos enferma, el mas cercano a su izquierda muere la siguiente noche",
    "El hombre Lobo Albino": "Cada 2 noches se le llama y debe matar a un Lobo",
    "El Lobo feroz": "Mata doble si no hay ningun lobo muerto",
    "El Zorro": "Cada noche elige un jugador, se añadirán a sus 2 adyacentes, el narrador levantará el pulgar si hay un lobo entre esos 3. Si acierta puede usar su poder la siguiente ronda, si falla pierde su poder para siempre",
    "El Domador de Osos": "Al saber los muertos de noche, el narrador hará un rugido si hay algún lobo adyacente al Domador de Osos. Si el Domador de Osos está infectado, se rugirá todas las rondas",
    "Juez Tartamudo": "Puede decidir mediante un gesto durante la votación de la aldea, que habrá una segunda votación",
    "Ángel": "Si consigue morir en la primera votación de día, GANA LA PARTIDA",


};

// Estado temporal de contadores de roles
let rolesCounters = {};

// --------------------- FUNCIONES ---------------------
function guardarPartida() {
    const partida = {
        numJugadores,
        rolesSeleccionados,
        nombresJugadores,
        turnos,
        currentTurn,
        jugadoresEstado,
        dia,
        historial,
        jugadoresNotas
    };
    localStorage.setItem('hombresLoboPartida', JSON.stringify(partida));
}

function cargarPartida() {
    const partidaGuardada = localStorage.getItem('hombresLoboPartida');
    if (!partidaGuardada) return false;
    const p = JSON.parse(partidaGuardada);
    numJugadores = p.numJugadores;
    rolesSeleccionados = p.rolesSeleccionados;
    nombresJugadores = p.nombresJugadores;
    turnos = p.turnos;
    currentTurn = p.currentTurn;
    jugadoresEstado = p.jugadoresEstado;
    dia = p.dia;
    historial = p.historial;
    jugadoresNotas = p.jugadoresNotas || {};

    actualizarDesplegableVidente();
    actualizarListaNarrador();
    actualizarHistorialUI();
    actualizarResumenFinal();
    contadorDiasSpan.textContent = dia;

    // Restaurar pantalla
    if (nombresJugadores.length > 0) {
        inicioScreen.classList.remove('active');
        turnosScreen.classList.add('active');
        mostrarTurno();
    }
    return true;
}

function generarInputsNombres() {
    if (nombresListDiv.children.length === 0) {
        for (let i = 0; i < numJugadores; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Jugador ${i + 1}`;
            if (nombresJugadores[i]) input.value = nombresJugadores[i];
            nombresListDiv.appendChild(input);
        }
    }
}

function initRolesCounters() {
    // Inicializar contadores a 0
    [...rolesConfig.lobos, ...rolesConfig.aldeanos, ...rolesConfig.ambiguos].forEach(rol => {
        if (rolesCounters[rol] === undefined) rolesCounters[rol] = 0;
    });
    renderRoleCategories();
    updateTotalRoles();
}

function renderRoleCategories() {
    catLobosDiv.innerHTML = '';
    catAldeanosDiv.innerHTML = '';
    catAmbiguosDiv.innerHTML = '';

    rolesConfig.lobos.forEach(rol => createRoleCounter(rol, catLobosDiv));
    rolesConfig.aldeanos.forEach(rol => createRoleCounter(rol, catAldeanosDiv));
    rolesConfig.ambiguos.forEach(rol => createRoleCounter(rol, catAmbiguosDiv));
}

function createRoleCounter(rol, container) {
    const div = document.createElement('div');
    div.className = 'role-counter-box';
    div.innerHTML = `
        <span class="role-label">${rol}</span>
        <div class="counter-controls">
            <button class="counter-btn minus" data-rol="${rol}">-</button>
            <span class="counter-value" id="count-${rol}">${rolesCounters[rol] || 0}</span>
            <button class="counter-btn plus" data-rol="${rol}">+</button>
        </div>
    `;
    container.appendChild(div);

    div.querySelector('.minus').addEventListener('click', () => updateRoleCount(rol, -1));
    div.querySelector('.plus').addEventListener('click', () => updateRoleCount(rol, 1));
}

function updateRoleCount(rol, change) {
    const current = rolesCounters[rol] || 0;
    const newValue = Math.max(0, current + change);
    rolesCounters[rol] = newValue;
    document.getElementById(`count-${rol}`).textContent = newValue;
    updateTotalRoles();
}
function updateTotalRoles() {
    const total = Object.values(rolesCounters).reduce((a, b) => a + b, 0);
    totalRolesCountSpan.textContent = total;
    targetRolesCountSpan.textContent = numJugadores;

    if (total >= numJugadores) {
        totalRolesCountSpan.style.color = '#2ecc71'; // Green
    } else {
        totalRolesCountSpan.style.color = '#e74c3c'; // Red
    }
}

function asignarRoles() {
    turnos = [];
    // Construir array plano de roles basado en contadores
    for (const [rol, count] of Object.entries(rolesCounters)) {
        for (let i = 0; i < count; i++) {
            turnos.push(rol);
        }
    }

    // Mezclar TODOS los roles seleccionados primero
    turnos = turnos.sort(() => Math.random() - 0.5);

    // Si hay más roles que jugadores, recortar el array
    if (turnos.length > numJugadores) {
        turnos = turnos.slice(0, numJugadores);
    }

    // Rellenar con Aldeanos si faltan (por si acaso)
    while (turnos.length < numJugadores) { turnos.push("Aldeano"); }
}

function mostrarTurno() {
    turnoJugador.textContent = `Turno de ${nombresJugadores[currentTurn]}`;
    rolJugadorDiv.style.display = 'none';
    siguienteJugadorBtn.style.display = 'none';
}

function actualizarDesplegableVidente() {
    seleccionarJugadorVidente.innerHTML = '';
    asesinoSelect.innerHTML = '';
    victimaSelect.innerHTML = '';

    const optionPueblo = document.createElement('option');
    optionPueblo.value = 'Pueblo';
    optionPueblo.textContent = 'Pueblo';
    asesinoSelect.appendChild(optionPueblo);

    nombresJugadores.forEach((nombre, i) => {
        const option1 = document.createElement('option');
        option1.value = i; option1.textContent = nombre;
        seleccionarJugadorVidente.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = i; option2.textContent = nombre;
        asesinoSelect.appendChild(option2);

        const option3 = document.createElement('option');
        option3.value = i; option3.textContent = nombre;
        victimaSelect.appendChild(option3);
    });
}

function actualizarListaNarrador() {
    listaJugadoresNarrador.innerHTML = '';
    nombresJugadores.forEach((nombre, i) => {
        const li = document.createElement('li');

        // Contenedor info jugador
        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `${nombre} - <strong>${turnos[i]}</strong>`;
        infoDiv.style.cursor = 'pointer';
        infoDiv.style.flexGrow = '1';

        if (jugadoresEstado[i] === "dead") li.classList.add('muerto');

        infoDiv.addEventListener('click', () => {
            jugadoresEstado[i] = jugadoresEstado[i] === "alive" ? "dead" : "alive";
            actualizarListaNarrador();
            guardarPartida();
        });

        // Botón Nota
        const noteBtn = document.createElement('button');
        noteBtn.className = 'btn-note';
        if (jugadoresNotas[i] && jugadoresNotas[i].trim() !== "") {
            noteBtn.classList.add('has-note');
            noteBtn.innerHTML = '<i class="fa-solid fa-file-lines"></i>';
        } else {
            noteBtn.innerHTML = '<i class="fa-regular fa-file"></i>';
        }

        noteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar togglear estado muerto/vivo
            abrirNotas(i);
        });

        li.appendChild(infoDiv);
        li.appendChild(noteBtn);
        listaJugadoresNarrador.appendChild(li);
    });
}

function abrirNotas(index) {
    jugadorNotaActual = index;
    tituloNotas.textContent = `Notas para ${nombresJugadores[index]}`;
    textoNotas.value = jugadoresNotas[index] || "";
    modalNotas.style.display = 'flex';
    textoNotas.focus();
}

function agregarHistorial(evento) {
    historial.push({ dia: dia, evento: evento });
    actualizarHistorialUI();
    actualizarResumenFinal();
    guardarPartida();
}

function actualizarHistorialUI() {
    historialDiv.innerHTML = '';
    historial.forEach(h => {
        const p = document.createElement('p');
        p.textContent = `Día ${h.dia}: ${h.evento}`;
        historialDiv.appendChild(p);
    });
}

function actualizarResumenFinal() {
    resumenFinalDiv.innerHTML = '';
    historial.forEach(h => {
        const p = document.createElement('p');
        p.textContent = `Día ${h.dia}: ${h.evento}`;
        resumenFinalDiv.appendChild(p);
    });
}

// --------------------- EVENTOS ---------------------
// Cargar partida si existe
cargarPartida();

// Inicio
siguienteNumJugadores.addEventListener('click', () => {
    numJugadores = parseInt(document.getElementById('numJugadoresSelect').value);
    if (numJugadores < 3) { alert("Debe haber al menos 3 jugadores."); return; }
    inicioScreen.classList.remove('active');
    rolesScreen.classList.add('active');
    initRolesCounters(); // Inicializar contadores
    guardarPartida();
});

// Toggle categorías roles
document.querySelectorAll('.category-title').forEach(title => {
    title.addEventListener('click', () => {
        const content = title.nextElementSibling;
        content.classList.toggle('open');
        const icon = title.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
});

// Volver
volverInicioBtn.addEventListener('click', () => { rolesScreen.classList.remove('active'); inicioScreen.classList.add('active'); });
volverRolesBtn.addEventListener('click', () => { nombresScreen.classList.remove('active'); rolesScreen.classList.add('active'); });

// Roles Siguiente
siguienteRoles.addEventListener('click', () => {
    const total = Object.values(rolesCounters).reduce((a, b) => a + b, 0);
    if (total < numJugadores) {
        alert(`Has seleccionado solo ${total} roles, pero hay ${numJugadores} jugadores. Selecciona al menos tantos roles como jugadores.`);
        return;
    }

    // Guardar selección para persistencia
    rolesSeleccionados = [];
    for (const [rol, count] of Object.entries(rolesCounters)) {
        for (let i = 0; i < count; i++) rolesSeleccionados.push(rol);
    }

    rolesScreen.classList.remove('active');
    nombresScreen.classList.add('active');
    generarInputsNombres();
    guardarPartida();
});

// Nombres Siguiente
siguienteNombres.addEventListener('click', () => {
    const inputs = nombresListDiv.querySelectorAll('input');
    nombresJugadores = Array.from(inputs).map(i => i.value.trim());
    if (nombresJugadores.includes("")) { alert("Todos los jugadores deben tener nombre."); return; }
    nombresScreen.classList.remove('active');

    playDiceAnimation(() => {
        turnosScreen.classList.add('active');
        asignarRoles(); // Usa rolesCounters
        jugadoresEstado = nombresJugadores.map(() => "alive");
        mostrarTurno();
        actualizarDesplegableVidente();
        guardarPartida();
    });
});

// Turnos
verRolBtn.addEventListener('click', () => {
    const rol = turnos[currentTurn];
    nombreRolH2.textContent = rol;
    descripcionRolP.textContent = rolesDescripcion[rol];
    rolJugadorDiv.style.display = 'block';
    siguienteJugadorBtn.style.display = 'block';
});

siguienteJugadorBtn.addEventListener('click', () => {
    currentTurn++;
    if (currentTurn >= numJugadores) { alert("Todos los jugadores han visto su rol. ¡Empieza el juego!"); return; }
    mostrarTurno();
    guardarPartida();
});

// Menú narrador
menuNarradorBtn.addEventListener('click', () => {
    modalConfirmarNarrador.style.display = 'flex';
});

confirmarNarradorBtn.addEventListener('click', () => {
    modalConfirmarNarrador.style.display = 'none';
    turnosScreen.classList.remove('active');
    narradorScreen.classList.add('active');
    actualizarListaNarrador();
    actualizarDesplegableVidente();
});

cancelarNarradorBtn.addEventListener('click', () => {
    modalConfirmarNarrador.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modalConfirmarNarrador) {
        modalConfirmarNarrador.style.display = 'none';
    }
});

// Volver
volverTurnosBtn.addEventListener('click', () => { narradorScreen.classList.remove('active'); turnosScreen.classList.add('active'); });

// Avanzar día
comenzarJuegoBtn.addEventListener('click', () => {
    dia++;
    contadorDiasSpan.textContent = dia;
    alert(`Día ${dia} iniciado`);
    agregarHistorial(`Día ${dia} iniciado`);
    guardarPartida();
});

// Modo vidente
abrirVidenteBtn.addEventListener('click', () => { modalVidente.style.display = 'flex'; });
verRolVidenteBtn.addEventListener('click', () => {
    const idx = parseInt(seleccionarJugadorVidente.value);
    if (isNaN(idx)) return;
    nombreRolVidente.textContent = turnos[idx];
    descripcionRolVidente.textContent = rolesDescripcion[turnos[idx]];
});
cerrarVidenteBtn.addEventListener('click', () => {
    modalVidente.style.display = 'none';
    nombreRolVidente.textContent = '';
    descripcionRolVidente.textContent = '';
});
window.addEventListener('click', (e) => { if (e.target == modalVidente) { modalVidente.style.display = 'none'; } });

// Registrar muerte
abrirMuerteBtn.addEventListener('click', () => { modalMuerte.style.display = 'flex'; });
cerrarMuerteBtn.addEventListener('click', () => { modalMuerte.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target == modalMuerte) { modalMuerte.style.display = 'none'; } });

registrarMuerteBtn.addEventListener('click', () => {
    const asesinoVal = asesinoSelect.value;
    const victimaIdx = parseInt(victimaSelect.value);
    if (asesinoVal === victimaIdx) { alert("Un jugador no puede matarse a sí mismo."); return; }
    jugadoresEstado[victimaIdx] = "dead";
    const asesinoNombre = asesinoVal === 'Pueblo' ? 'Pueblo' : nombresJugadores[asesinoVal];
    agregarHistorial(`${asesinoNombre} mató a ${nombresJugadores[victimaIdx]}`);
    actualizarListaNarrador();
    modalMuerte.style.display = 'none';
    // Revisar pareja
    if (parejaEnamorada.j1 !== null) {

        if (victimaIdx === parejaEnamorada.j1) {
            jugadoresEstado[parejaEnamorada.j2] = "dead";
            agregarHistorial(`${nombresJugadores[parejaEnamorada.j2]} murió de pena por su enamorado 💔`);
        }

        if (victimaIdx === parejaEnamorada.j2) {
            jugadoresEstado[parejaEnamorada.j1] = "dead";
            agregarHistorial(`${nombresJugadores[parejaEnamorada.j1]} murió de pena por su enamorado 💔`);
        }
    }
});
// === CUPIDO ===
// Variables ya declaradas arriba:
// abrirCupidoBtn, modalCupido, cerrarCupidoBtn

abrirCupidoBtn.addEventListener("click", () => {
    cargarSelectCupido();
    modalCupido.style.display = "flex";
});

cerrarCupidoBtn.addEventListener("click", () => {
    modalCupido.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modalCupido) {
        modalCupido.style.display = "none";
    }
});


// Guardar pareja
let parejaEnamorada = { j1: null, j2: null };


// ABRIR MODAL
abrirCupidoBtn.addEventListener("click", () => {
    cargarSelectCupido();
    modalCupido.style.display = "flex";
});

// CERRAR MODAL
cerrarCupidoBtn.addEventListener("click", () => {
    modalCupido.style.display = "none";
});

// CERRAR clic fuera
window.addEventListener("click", (e) => {
    if (e.target === modalCupido) {
        modalCupido.style.display = "none";
    }
});


// CARGAR JUGADORES EN LOS SELECT
function cargarSelectCupido() {
    cupidoSelect1.innerHTML = "";
    cupidoSelect2.innerHTML = "";

    nombresJugadores.forEach((nombre, idx) => {
        if (jugadoresEstado[idx] !== "dead") { // evitar muertos
            let op1 = document.createElement("option");
            op1.value = idx;
            op1.textContent = nombre;

            let op2 = op1.cloneNode(true);

            cupidoSelect1.appendChild(op1);
            cupidoSelect2.appendChild(op2);
        }
    });
}
// CONFIRMAR CUPIDO
confirmarCupidoBtn.addEventListener("click", () => {
    const j1 = parseInt(cupidoSelect1.value);
    const j2 = parseInt(cupidoSelect2.value);

    if (j1 === j2) {
        alert("Cupido no puede enamorar a la misma persona.");
        return;
    }

    parejaEnamorada.j1 = j1;
    parejaEnamorada.j2 = j2;

    agregarHistorial(`❤️ ${nombresJugadores[j1]} y ${nombresJugadores[j2]} han sido flechados por Cupido.`);

    modalCupido.style.display = "none";
});
// Historial
abrirHistorialBtn.addEventListener('click', () => { modalHistorial.style.display = 'flex'; });
cerrarHistorialBtn.addEventListener('click', () => { modalHistorial.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target == modalHistorial) { modalHistorial.style.display = 'none'; } });

// Notas
cerrarNotasBtn.addEventListener('click', () => modalNotas.style.display = 'none');
window.addEventListener('click', (e) => { if (e.target == modalNotas) modalNotas.style.display = 'none'; });

guardarNotasBtn.addEventListener('click', () => {
    if (jugadorNotaActual !== -1) {
        jugadoresNotas[jugadorNotaActual] = textoNotas.value;
        actualizarListaNarrador(); // Para actualizar icono
        guardarPartida();
        modalNotas.style.display = 'none';
    }
});

// Modal PDF
const verReglasBtn = document.getElementById('verReglasBtn');
const verReglasNarradorBtn = document.getElementById('verReglasNarradorBtn');

verReglasBtn.addEventListener('click', () => { window.open('reglas.pdf', '_blank'); });
if (verReglasNarradorBtn) {
    verReglasNarradorBtn.addEventListener('click', () => { window.open('reglas.pdf', '_blank'); });
}

// Modal QR Roles
const verExplicacionRolesBtn = document.getElementById('verExplicacionRolesBtn');
const modalQR = document.getElementById('modalQR');
const cerrarQRBtn = document.getElementById('cerrarQRBtn');
const qrcodeContainer = document.getElementById('qrcode');
let qrCodeObj = null;

verExplicacionRolesBtn.addEventListener('click', () => {
    modalQR.style.display = 'flex';
    qrcodeContainer.innerHTML = ''; // Limpiar anterior
    
    // Obtener URL absoluta de roles.html
    const url = new URL('roles.html', window.location.href).href;
    
    qrCodeObj = new QRCode(qrcodeContainer, {
        text: url,
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
});

cerrarQRBtn.addEventListener('click', () => {
    modalQR.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modalQR) {
        modalQR.style.display = 'none';
    }
});


// Mini Chat Narrador
abrirChatNarradorBtn.addEventListener('click', () => {
    modalChatNarrador.style.display = 'flex';
    chatInput.focus();
});
cerrarChatBtn.addEventListener('click', () => modalChatNarrador.style.display = 'none');
window.addEventListener('click', (e) => { if (e.target == modalChatNarrador) modalChatNarrador.style.display = 'none'; });

enviarChatBtn.addEventListener('click', () => {
    const msg = chatInput.value.trim();
    if (msg === "") return;
    const p = document.createElement('p');
    p.textContent = `Narrador: ${msg}`;
    chatMensajes.appendChild(p);
    chatMensajes.scrollTop = chatMensajes.scrollHeight;
    chatInput.value = '';
});

// Reiniciar Partida
const modalReiniciar = document.getElementById('modalReiniciar');
const cerrarReiniciarBtn = document.getElementById('cerrarReiniciarBtn');
const reiniciarRapidoBtn = document.getElementById('reiniciarRapidoBtn');
const reiniciarCompletoBtn = document.getElementById('reiniciarCompletoBtn');
const animacionDado = document.getElementById('animacionDado');

reiniciarPartidaBtn.addEventListener('click', () => {
    modalReiniciar.style.display = 'flex';
});

cerrarReiniciarBtn.addEventListener('click', () => {
    modalReiniciar.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modalReiniciar) modalReiniciar.style.display = 'none';
});

function playDiceAnimation(callback) {
    animacionDado.style.display = 'flex';
    setTimeout(() => {
        animacionDado.style.display = 'none';
        if (callback) callback();
    }, 3000);
}

reiniciarRapidoBtn.addEventListener('click', () => {
    if (!confirm("¿Seguro que quieres volver a jugar con los mismos jugadores? Se repartirán nuevos roles.")) return;

    modalReiniciar.style.display = 'none';
    narradorScreen.classList.remove('active');

    turnos = [];
    currentTurn = 0;
    dia = 1;
    historial = [];
    jugadoresEstado = nombresJugadores.map(() => "alive");
    // Mantener notas? Probablemente no, resetear
    jugadoresNotas = {};

    playDiceAnimation(() => {
        asignarRoles();
        turnosScreen.classList.add('active');
        mostrarTurno();
        contadorDiasSpan.textContent = dia;
        actualizarDesplegableVidente();
        actualizarHistorialUI();
        actualizarResumenFinal();
        guardarPartida();
    });
});

reiniciarCompletoBtn.addEventListener('click', () => {
    if (confirm("¿Seguro que quieres empezar de cero? Se borrarán todos los datos.")) {
        localStorage.removeItem('hombresLoboPartida');
        location.reload();
    }
});
