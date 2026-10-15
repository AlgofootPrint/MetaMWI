# MetaMWI

**Interactive Metasurface-Assisted Microwave Imaging Demonstrator**

MetaMWI is a small educational visualization inspired by concepts discussed in:

**P. Mojabi, M. Phaneuf, and Z. Liu,  
"Some Possibilities for Utilizing Metasurfaces in Microwave Imaging," 2023.**

The project was built to explore, in a simple visual way, how increasing the number of antenna positions differs from using a reconfigurable metasurface to create different illumination conditions.

---

## Overview

Microwave imaging systems use electromagnetic waves to gather information about an object or region of interest.

One way to increase the amount of measurement information available to an imaging system is to add more physical antenna positions.

Another approach discussed in the referenced paper is the use of reconfigurable metasurfaces, which can change the illumination conditions without simply adding more antennas.

MetaMWI provides a simple visual comparison of these two ideas.

---

## Features

### More Antennas

Users can switch between:

- 4 antenna positions
- 8 antenna positions
- 12 antenna positions

As the antenna count increases, the visualization shows more physical measurement positions around the imaging domain.

This represents the idea that increasing the number of antennas can provide more spatial measurement coverage, but can also require additional physical hardware and acquisition channels.

### Reconfigurable Metasurface

The metasurface mode keeps the metasurface hardware arrangement fixed while allowing the user to switch between different configurations.

Three illustrative patterns are provided:

- Pattern 1 — Uniform illumination
- Pattern 2 — Converging illumination
- Pattern 3 — Tilted illumination

Changing the metasurface configuration changes the illustrated wave pattern reaching the object without simply adding more physical antennas.

The patterns are schematic representations intended to make the concept easier to understand. They are not outputs from a full electromagnetic simulation.

---

## Approach Comparison

MetaMWI compares two simplified approaches.

### More Antennas

- More physical measurement positions
- Additional hardware and acquisition channels
- Greater spatial measurement coverage
- Fixed antenna geometry for a given configuration

### Reconfigurable Metasurface

- Multiple illumination patterns from the same metasurface hardware
- Different measurement conditions without simply adding more antennas
- Metasurface configurations can be electronically changed
- Adds fabrication and tuning complexity
- Offers a flexible approach to creating different illumination conditions

Neither approach is presented as universally better.

Different system designs involve trade-offs between hardware complexity, flexibility, measurement diversity, and implementation requirements.

---

## Technical Scope

MetaMWI is an educational visualization inspired by concepts discussed in Mojabi, Phaneuf, and Liu (2023).

It does **not**:

- solve Maxwell's equations
- perform full-wave electromagnetic simulation
- implement a validated microwave-imaging inversion algorithm
- predict real-world imaging performance

The following elements are schematic and illustrative:

- antenna positions
- metasurface unit cells
- wave trajectories
- illumination patterns

They are intended to communicate the underlying concepts in a simple and accessible way.

---

## Motivation

I built MetaMWI after reading the paper to better understand one of the ideas discussed by the authors: the possibility of using reconfigurable metasurfaces to create different illumination conditions in microwave-imaging systems.

I wanted to compare this visually with the more straightforward approach of increasing the number of physical antenna positions.

The project was intentionally kept simple. Rather than attempting to build a full electromagnetic simulator, I focused on creating an interactive visualization that helped me understand and communicate the basic idea more clearly.

---

## How It Works

In **More Antennas** mode, the user can choose between 4, 8, and 12 antenna positions.

The visual arrangement changes to show how adding antennas increases the number of physical positions around the imaging domain.

In **Reconfigurable Metasurface** mode, the user can switch between three illustrative metasurface configurations.

Each configuration changes the schematic illumination pattern while keeping the overall metasurface hardware arrangement fixed.

This allows the user to visually explore the difference between:

**adding more physical measurement positions**

and

**changing the illumination conditions using a reconfigurable surface.**

---

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- SVG / browser-based visualization

---

## Running Locally

Clone the repository:

```
git clone https://github.com/Algofootprint/MetaMWI.git
```

Move into the project directory:

```
cd MetaMWI
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Create a production build:

```
npm run build
```

---

## Reference

P. Mojabi, M. Phaneuf, and Z. Liu,  
**"Some Possibilities for Utilizing Metasurfaces in Microwave Imaging,"**  
2023.

MetaMWI is an independent educational project and is not affiliated with the authors or the University of Manitoba.

---

## Author

**Damilola Ayobami Ojoawo**

Electrical & Electronics Engineering  
Applied Electromagnetics | Intelligent Systems
