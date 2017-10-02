# FallSafe

## Overview

Rock climbing is a diverse sport with many distinct disciplines.  In the sport and traditional climbing styles, climbers ascend in pairs.  One climber is the belayer, holding the rope while the other climber (the leader) climbs.

The leader is tied into one end of the rope, and he or she clips the rope through protection lodged in the rock along the way up.  
Climbers use a mix of fixed, drilled bolts, and clean protection (nuts, cams, and hexes) brought up from the base to protect a climb.

Fig 1. Sport climber ascending, clipping to bolts drilled in the stone.
![sport](https://user-images.githubusercontent.com/29419913/31064710-cd25db62-a6f3-11e7-965c-ba83a45ee94a.jpg)

Fig 2. A climbing cam placed inside a crack.
![cam-placement](https://camo.githubusercontent.com/8d73f7b5388bee6e90964e821b5d31a03267aef2/68747470733a2f2f73697465732e646172746d6f7574682e6564752f666f6c6b6c6f7265617263686976652f66696c65732f323031362f30352f3230303933335f32393535335f584c2d363234783833322e6a7067)

If a climber falls while leading, the length of the fall will equal twice the distance to the last piece of protection, plus the stretch distance of the dynamic rope.  

![fall-factor](https://camo.githubusercontent.com/de19d9566ae69629f69dcc66dad91f1186333971/68747470733a2f2f7777772e726f7065626f6f6b2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f66662d6c6561642d636c696d62696e672e6a7067)

Depending on several variables (e.g. fall distance, climber mass, fall factor, rope elasticity), such a fall can put large amounts of force on a climber's protection.

FallSafe is a tool for modeling the fall forces involved in different climbing fall scenarios, and testing those forces against strength ratings for climbing protection.

## Functionality and MVPs

Users will be able to:

- click to render a visual representation of a simulated climbing fall
- adjust variables, including:
  - climber mass
  - distance from belayer
  - distance to last piece of protection
  - strength rating of protection (in kN)
- select from a variety of different real-world, commercially-available cams, nuts, and bolts to test with




## Wireframes

## Architecture and Technologies

FallSafe will utilize the following technologies:
- vanilla javascript for the physics engine
- `HTML5 Canvas` for rendering and DOM manipulation
- Webpack for bundling the project's scripts

The project will contain 4 scripts, connected to a Webpack entry file:

- `animation.js`: this will contain the code for updating and rendering the DOM with Canvas
- `climber.js`: will contain the climber object and associated functions
- `rope.js`: will contain the logic for the dynamic rope
- `protection.js`: will contain the code for the variable protection object


## Timeline

#### Over the Weekend

- Researched force models for climbing protection at various degrees of precision
- Physics engine tutorial on gravity

#### Monday

- Physics engine tutorial on springs and damping
- Begin writing code for the engine

#### Day 1

- Finish physics engine
- canvas tutorial/refresher
- Begin work on rendering fall simulation in canvas

#### Day 2

- Finish canvas animation
- Begin work on user interface (slider bars, maybe drag and drop for climber and protection)

#### Day 3

- complete user interface
- Begin styling

#### Day 4

- Finish styling
- Polish any rough edges

## Sources

Force Equations:
https://ocw.mit.edu/courses/experimental-study-group/es-255-physics-of-rock-climbing-spring-2006/lecture-notes/MITES_255S06_rope_behav.pdf
http://www.rockclimbing.com/cgi-bin/forum/gforum.cgi?do=post_attachment;postatt_id=746

Gear Rating Examples:
http://blackdiamondequipment.com/en/climbing-cams-stoppers-nuts-hexes/camalottm-BD2621200000ALL1.html
http://blackdiamondequipment.com/en/climbing-cams-stoppers-nuts-hexes/stoppers-BD2252010000ALL1.html
