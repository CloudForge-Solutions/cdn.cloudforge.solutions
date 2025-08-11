import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.RH_Wq4ov.js";function R({certificates:n,scrollSpeed:c=1,pauseOnHover:m=!0,className:d=""}){const f=a.useRef(null),[u,p]=a.useState(!1),o=a.useRef(),r=a.useRef(0);a.useEffect(()=>{const e=f.current;if(!e||n.length===0)return;e.innerHTML="";const x=()=>{n.forEach(l=>{const t=document.createElement("img");t.src=l.src,t.alt=l.alt,t.title=l.title,t.height=150,t.className="object-contain transition-transform hover:scale-110 flex-shrink-0",t.loading="lazy",t.decoding="async",t.style.cssText=`
          max-height: 150px !important;
          max-width: 150px !important;
          height: 150px !important;
          width: 150px !important;
          min-height: 150px !important;
          min-width: 150px !important;
          margin-left: 60px !important;
          margin-right: 60px !important;
        `,e.appendChild(t)})};x(),x();const y=e.scrollWidth/2,i=92;r.current=i,e.style.transform=`translateX(-${i}px)`;const h=()=>{!u&&e&&(r.current+=c,r.current>=y+i&&(r.current=i),e.style.transform=`translateX(-${r.current}px)`),o.current=requestAnimationFrame(h)};return h(),()=>{o.current&&cancelAnimationFrame(o.current)}},[n,c,u]);const g=()=>{m&&p(!0)},v=()=>{m&&p(!1)};return!n||n.length===0?s.jsx("div",{className:"text-center text-gray-400 py-8",children:s.jsx("p",{children:"No certificates available"})}):s.jsx("div",{className:`relative mx-auto overflow-hidden max-w-screen mb-12 ${d}`,children:s.jsx("div",{ref:f,className:"flex gap-16 px-4 py-8 transition-transform duration-75 ease-linear",onMouseEnter:g,onMouseLeave:v,"data-initial-transform":"-92px"})})}export{R as default};
