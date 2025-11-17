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
const seleccionarJugadorVidente = document.getElementById('seleccionarJugadorVidente');
const verRolVidenteBtn = document.getElementById('verRolVidenteBtn');

// Modal Vidente
const modalVidente = document.getElementById('modalVidente');
const nombreRolVidente = document.getElementById('nombreRolVidente');
const descripcionRolVidente = document.getElementById('descripcionRolVidente');
const cerrarVidenteBtn = document.getElementById('cerrarVidenteBtn');

// Registro de muertes
const asesinoSelect = document.getElementById('asesinoSelect');
const victimaSelect = document.getElementById('victimaSelect');
const registrarMuerteBtn = document.getElementById('registrarMuerteBtn');

// Historial y resumen
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
const reiniciarPartidaBtn = document.createElement('button');
reiniciarPartidaBtn.textContent = "Reiniciar partida";
reiniciarPartidaBtn.style.marginTop = "10px";
narradorScreen.appendChild(reiniciarPartidaBtn);

// --------------------- VARIABLES DE PARTIDA ---------------------
let numJugadores = 0;
let rolesSeleccionados = [];
let nombresJugadores = [];
let turnos = [];
let currentTurn = 0;
let jugadoresEstado = [];
let dia = 1;
let historial = [];

// --------------------- DESCRIPCIÓN DE ROLES ---------------------
const rolesDescripcion = {
    "Lobo": "Tu objetivo es eliminar a los aldeanos. Actúas de noche y eliges a quién atacar.",
    "Lobo Infectador": "Tu objetivo es eliminar a los aldeanos y puedes infectar a un ciudadano.",
    "Vidente": "Cada noche puedes descubrir el rol de un jugador.",
    "Protector": "Puedes proteger a un jugador de ser atacado por los lobos.",
    "Bruja": "Tienes una poción para salvar a alguien y otra para eliminar.",
    "Cazador": "Si mueres, puedes eliminar a un jugador inmediatamente.",
    "Aldeano": "No tienes habilidades especiales, pero participa en las votaciones."
};

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
        historial
    };
    localStorage.setItem('hombresLoboPartida', JSON.stringify(partida));
}

function cargarPartida() {
    const partidaGuardada = localStorage.getItem('hombresLoboPartida');
    if(!partidaGuardada) return false;
    const p = JSON.parse(partidaGuardada);
    numJugadores = p.numJugadores;
    rolesSeleccionados = p.rolesSeleccionados;
    nombresJugadores = p.nombresJugadores;
    turnos = p.turnos;
    currentTurn = p.currentTurn;
    jugadoresEstado = p.jugadoresEstado;
    dia = p.dia;
    historial = p.historial;

    actualizarDesplegableVidente();
    actualizarListaNarrador();
    actualizarHistorialUI();
    actualizarResumenFinal();
    contadorDiasSpan.textContent = dia;

    // Restaurar pantalla
    if(nombresJugadores.length > 0){
        inicioScreen.classList.remove('active');
        turnosScreen.classList.add('active');
        mostrarTurno();
    }
    return true;
}

function generarInputsNombres() {
    if(nombresListDiv.children.length === 0){
        for(let i=0;i<numJugadores;i++){
            const input = document.createElement('input');
            input.type='text';
            input.placeholder=`Jugador ${i+1}`;
            if(nombresJugadores[i]) input.value = nombresJugadores[i];
            nombresListDiv.appendChild(input);
        }
    }
}

function asignarRoles() {
    turnos = [...rolesSeleccionados];
    while(turnos.length < numJugadores){ turnos.push("Aldeano"); }
    turnos = turnos.sort(()=>Math.random()-0.5);
}

function mostrarTurno(){
    turnoJugador.textContent = `Turno de ${nombresJugadores[currentTurn]}`;
    rolJugadorDiv.style.display='none';
    siguienteJugadorBtn.style.display='none';
}

function actualizarDesplegableVidente() {
    seleccionarJugadorVidente.innerHTML = '';
    asesinoSelect.innerHTML = '';
    victimaSelect.innerHTML = '';

    const optionPueblo = document.createElement('option');
    optionPueblo.value = 'Pueblo';
    optionPueblo.textContent = 'Pueblo';
    asesinoSelect.appendChild(optionPueblo);

    nombresJugadores.forEach((nombre,i)=>{
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

function actualizarListaNarrador(){
    listaJugadoresNarrador.innerHTML='';
    nombresJugadores.forEach((nombre,i)=>{
        const li = document.createElement('li');
        li.innerHTML = `${nombre} - <strong>${turnos[i]}</strong>`;
        if(jugadoresEstado[i]==="dead") li.classList.add('muerto');
        li.addEventListener('click', ()=>{
            jugadoresEstado[i] = jugadoresEstado[i]==="alive" ? "dead" : "alive";
            actualizarListaNarrador();
            guardarPartida();
        });
        listaJugadoresNarrador.appendChild(li);
    });
}

function agregarHistorial(evento){
    historial.push({dia: dia, evento: evento});
    actualizarHistorialUI();
    actualizarResumenFinal();
    guardarPartida();
}

function actualizarHistorialUI(){
    historialDiv.innerHTML='';
    historial.forEach(h=>{
        const p = document.createElement('p');
        p.textContent = `Día ${h.dia}: ${h.evento}`;
        historialDiv.appendChild(p);
    });
}

function actualizarResumenFinal(){
    resumenFinalDiv.innerHTML='';
    historial.forEach(h=>{
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
    if(numJugadores < 3) { alert("Debe haber al menos 3 jugadores."); return; }
    inicioScreen.classList.remove('active');
    rolesScreen.classList.add('active');
    guardarPartida();
});

// Volver
volverInicioBtn.addEventListener('click', ()=>{rolesScreen.classList.remove('active');inicioScreen.classList.add('active');});
volverRolesBtn.addEventListener('click', ()=>{nombresScreen.classList.remove('active');rolesScreen.classList.add('active');});

// Roles
siguienteRoles.addEventListener('click', () => {
    rolesSeleccionados = Array.from(document.querySelectorAll('#rolesList input:checked')).map(r => r.value);
    if(rolesSeleccionados.length < numJugadores) { alert("Selecciona al menos tantos roles como jugadores."); return; }
    rolesScreen.classList.remove('active');
    nombresScreen.classList.add('active');
    generarInputsNombres();
    guardarPartida();
});

// Nombres
siguienteNombres.addEventListener('click', () => {
    const inputs = nombresListDiv.querySelectorAll('input');
    nombresJugadores = Array.from(inputs).map(i=>i.value.trim());
    if(nombresJugadores.includes("")) { alert("Todos los jugadores deben tener nombre."); return; }
    nombresScreen.classList.remove('active');
    turnosScreen.classList.add('active');
    asignarRoles();
    jugadoresEstado = nombresJugadores.map(()=> "alive");
    mostrarTurno();
    actualizarDesplegableVidente();
    guardarPartida();
});

// Turnos
verRolBtn.addEventListener('click',()=>{
    const rol = turnos[currentTurn];
    nombreRolH2.textContent = rol;
    descripcionRolP.textContent = rolesDescripcion[rol];
    rolJugadorDiv.style.display='block';
    siguienteJugadorBtn.style.display='block';
});

siguienteJugadorBtn.addEventListener('click',()=>{
    currentTurn++;
    if(currentTurn>=numJugadores){ alert("Todos los jugadores han visto su rol. ¡Empieza el juego!"); return; }
    mostrarTurno();
    guardarPartida();
});

// Menú narrador
menuNarradorBtn.addEventListener('click',()=>{
    turnosScreen.classList.remove('active');
    narradorScreen.classList.add('active');
    actualizarListaNarrador();
    actualizarDesplegableVidente();
});

// Volver
volverTurnosBtn.addEventListener('click',()=>{narradorScreen.classList.remove('active'); turnosScreen.classList.add('active');});

// Avanzar día
comenzarJuegoBtn.addEventListener('click',()=>{
    dia++;
    contadorDiasSpan.textContent = dia;
    alert(`Día ${dia} iniciado`);
    guardarPartida();
});

// Modo vidente
verRolVidenteBtn.addEventListener('click', () => {
    const idx = parseInt(seleccionarJugadorVidente.value);
    if(isNaN(idx)) return;
    nombreRolVidente.textContent = turnos[idx];
    descripcionRolVidente.textContent = rolesDescripcion[turnos[idx]];
    modalVidente.style.display = 'flex';
});
cerrarVidenteBtn.addEventListener('click',()=>{modalVidente.style.display='none';});
window.addEventListener('click',(e)=>{if(e.target==modalVidente){modalVidente.style.display='none';}});

// Registrar muerte
registrarMuerteBtn.addEventListener('click', ()=>{
    const asesinoVal = asesinoSelect.value;
    const victimaIdx = parseInt(victimaSelect.value);
    if(asesinoVal === victimaIdx){ alert("Un jugador no puede matarse a sí mismo."); return; }
    jugadoresEstado[victimaIdx]="dead";
    const asesinoNombre = asesinoVal==='Pueblo' ? 'Pueblo' : nombresJugadores[asesinoVal];
    agregarHistorial(`${asesinoNombre} mató a ${nombresJugadores[victimaIdx]}`);
    actualizarListaNarrador();
});

// Modal PDF
const verReglasBtn = document.getElementById('verReglasBtn');
const modalPDF = document.getElementById('modalPDF');
const cerrarPDF = document.getElementById('cerrarPDF');
verReglasBtn.addEventListener('click',()=>{modalPDF.style.display='block';});
cerrarPDF.addEventListener('click',()=>{modalPDF.style.display='none';});
window.addEventListener('click',(e)=>{if(e.target==modalPDF){modalPDF.style.display='none';}});

// --------------------- MINI CHAT NARRADOR ---------------------
abrirChatNarradorBtn.addEventListener('click', ()=>{
    modalChatNarrador.style.display='flex';
    chatInput.focus();
});

cerrarChatBtn.addEventListener('click', ()=> modalChatNarrador.style.display='none');
window.addEventListener('click', (e)=>{if(e.target==modalChatNarrador) modalChatNarrador.style.display='none';});

enviarChatBtn.addEventListener('click', ()=>{
    const msg = chatInput.value.trim();
    if(msg==="") return;
    const p = document.createElement('p');
    p.textContent = `Narrador: ${msg}`;
    chatMensajes.appendChild(p);
    chatMensajes.scrollTop = chatMensajes.scrollHeight;
    chatInput.value='';
});

// --------------------- REINICIAR PARTIDA ---------------------
reiniciarPartidaBtn.addEventListener('click', ()=>{
    if(confirm("¿Seguro que quieres reiniciar la partida? Se perderá todo el progreso.")){
        localStorage.removeItem('hombresLoboPartida');
        location.reload();
    }
});
