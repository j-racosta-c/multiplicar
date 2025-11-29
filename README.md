# Juego de Tablas de Multiplicar – Modo Challenge Único

Juego web en **HTML + CSS + JavaScript** para practicar multiplicaciones con tiempo limitado y un sistema de vidas.

---

## 🎯 Objetivo del Juego

Responder correctamente la mayor cantidad posible de multiplicaciones antes de:
- Agotar las **3 vidas**, o  
- Que se termine el tiempo disponible para responder.

---

## 🧩 Mecánica General

1. El jugador presiona un botón **"Iniciar"**.
2. El juego muestra:
   - Una **multiplicación al azar** (por ejemplo, `3 x 7`).
   - **Tres opciones de respuesta** en forma de botones o tarjetas.
   - Un **temporizador** con los segundos disponibles para esa multiplicación.
3. El jugador selecciona una de las opciones.

---

## ⏱️ Sistema de Tiempo

- La **primera multiplicación** comienza con **30 segundos**.
- La **segunda** comienza con **29 segundos**.
- La **tercera** con **28 segundos**, y así sucesivamente.
- Cada nueva multiplicación inicia con **1 segundo menos** que la anterior.

El temporizador se reinicia en cada nueva multiplicación con el valor que corresponda a ese nivel.

---

## ❤️ Sistema de Vidas

- El jugador comienza con **3 vidas** (3 corazones visibles en pantalla).
- Si el jugador:
  - **Elige una respuesta incorrecta**, o  
  - **Se le acaba el tiempo sin responder**,  
  entonces **pierde 1 vida**.
- Al perder las **3 vidas**, la partida termina y se muestra una pantalla de **Game Over**.

---

## 📈 Progresión de Niveles

- Cada multiplicación corresponde a un **nivel**.
- Si el jugador responde **correctamente** dentro del tiempo:
  - Pasa al **siguiente nivel**.
  - El temporizador del siguiente nivel inicia con **1 segundo menos** que el anterior.
- El juego puede mostrar:
  - El **nivel actual** (ej. "Nivel 5").
  - La **cantidad de respuestas correctas consecutivas**.

No hay selección de tabla específica: las multiplicaciones se generan de forma **aleatoria** (pueden definirse tablas del 1 al 10, por ejemplo).

---

## 🛠️ Componentes Básicos a Implementar

### Interfaz

- Botón **"Iniciar"**.
- Área para mostrar:
  - La multiplicación actual (`a x b`).
  - El **temporizador** (segundos restantes).
  - Las **3 opciones de respuesta** (botones/tarjetas).
  - Las **vidas** (3 corazones).
  - El **nivel actual**.

### Lógica en JavaScript

- Función para:
  - Generar una multiplicación aleatoria.
  - Calcular la respuesta correcta.
  - Generar 2 respuestas incorrectas y mezclarlas con la correcta.
- Control de:
  - **Nivel actual** (contador).
  - **Tiempo inicial por nivel** (30, 29, 28, …).
  - **Temporizador** (setInterval / clearInterval).
  - **Número de vidas**.
- Manejo de eventos:
  - Clic en **"Iniciar"**.
  - Clic en cada opción de respuesta.
- Estados del juego:
  - **En curso**.
  - **Game Over**.

---

## 🧪 Comportamiento Resumido

1. Iniciar juego → nivel 1, tiempo 30 s, 3 vidas.
2. Mostrar multiplicación al azar + 3 opciones.
3. El jugador responde:
   - Correcto → siguiente nivel, tiempo–1 segundo.
   - Incorrecto o se acaba el tiempo → vidas–1.
4. Si vidas > 0 → nueva multiplicación (siguiente nivel o mismo flujo).
5. Si vidas = 0 → **Game Over**.
