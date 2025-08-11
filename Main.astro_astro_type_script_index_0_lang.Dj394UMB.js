function m(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const n=this.getAttribute("href");if(n==="#"||!n)return;const i=document.querySelector(n);if(i){window.scrollTo({top:i.offsetTop-80,behavior:"smooth"});const a=document.getElementById("mobile-menu");a&&!a.classList.contains("hidden")&&a.classList.add("hidden")}})})}function r(){document.querySelectorAll(".animate-fade-in").forEach(t=>{const n=t.getBoundingClientRect().top,i=window.innerHeight/1.2;n<i&&(t.style.opacity="1")})}function w(){document.querySelectorAll(".animate-fade-in").forEach(e=>{const t=e;t.style.opacity="0",t.style.transition="opacity 0.6s ease-out"}),window.addEventListener("scroll",r),window.addEventListener("load",r)}const c=[{id:"devops",icon:"M5 13l4 4L19 7",titleKey:"fastTrack.features.devops.title",descriptionKey:"fastTrack.features.devops.description"},{id:"ai",icon:"M5 13l4 4L19 7",titleKey:"fastTrack.features.ai.title",descriptionKey:"fastTrack.features.ai.description"},{id:"team",icon:"M5 13l4 4L19 7",titleKey:"fastTrack.features.team.title",descriptionKey:"fastTrack.features.team.description"}];function d(e){return`
    <div class="flex items-start p-4 bg-white rounded-lg shadow-sm">
        <h3 class="flex items-center mb-2 text-lg font-semibold text-gray-900">
            <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${e.icon}"></path>
            </svg>
            <span data-i18n="${e.titleKey}"></span>
        </h3>
        <p class="text-gray-900" data-i18n="${e.descriptionKey}"></p>
    </div>
  `}function s(){return document.documentElement.lang||"en"}function y(){const e=document.getElementById("features-container");e&&typeof c<"u"&&typeof d=="function"&&(e.innerHTML=c.map(d).join(""),typeof window.updateTranslations=="function"&&typeof window.translations<"u"&&window.updateTranslations(e,window.translations,s()))}const l=["Cloud","DevOps","Kubernetes","CI/CD","Azure","AWS","GCloud"];function u(e){return`
    <span class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
        ${e}
    </span>
  `}function g(){const e=document.getElementById("expertise-tags");e&&typeof l<"u"&&typeof u=="function"&&(e.innerHTML=l.map(u).join(""),typeof window.updateTranslations=="function"&&typeof window.translations<"u"&&window.updateTranslations(e,window.translations,s()))}const f=[{key:"team",icon:"✅",color:"text-green-400"},{key:"costs",icon:"✅",color:"text-green-400"},{key:"security",icon:"✅",color:"text-green-400"},{key:"scalability",icon:"✅",color:"text-green-400"}],p=[{key:"deployment",icon:"🚀",color:"text-blue-400"},{key:"monitoring",icon:"📊",color:"text-purple-400"},{key:"automation",icon:"⚡",color:"text-yellow-400"},{key:"optimization",icon:"🎯",color:"text-red-400"}];function o(e,t){return`
    <li class="flex items-center p-3 bg-white rounded-lg shadow-sm">
        <span class="mr-3 text-xl ${e.color}">${e.icon}</span>
        <span class="text-gray-900" data-i18n="${t}.${e.key}"></span>
    </li>
  `}function h(){const e=document.getElementById("achievements-list"),t=document.getElementById("results-list");e&&typeof f<"u"&&typeof o=="function"&&(e.innerHTML=f.map(n=>o(n,"achievements")).join(""),typeof window.updateTranslations=="function"&&typeof window.translations<"u"&&window.updateTranslations(e,window.translations,s())),t&&typeof p<"u"&&typeof o=="function"&&(t.innerHTML=p.map(n=>o(n,"results")).join(""),typeof window.updateTranslations=="function"&&typeof window.translations<"u"&&window.updateTranslations(t,window.translations,s()))}class v{static createServiceCard(t,n){return`
      <div class="service-card p-6 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
          <div class="flex items-center mb-4">
              <span class="mr-3 text-2xl">${n.icon}</span>
              <h3 class="text-lg font-semibold text-black" data-i18n="services.${t}.title">
                  ${n.title}
              </h3>
          </div>
          <p class="text-sm leading-relaxed text-gray-500" data-i18n="services.${t}.description">
              ${n.description}
          </p>
      </div>
    `}static render(){const t=document.getElementById("services-grid");!t||!window.servicesData||(t.innerHTML=Object.entries(window.servicesData).map(([n,i])=>this.createServiceCard(n,i)).join(""))}static init(){this.render(),document.querySelectorAll(".service-card").forEach(t=>{t.addEventListener("mouseenter",()=>{t.classList.add("shadow-lg","shadow-blue-500/10")}),t.addEventListener("mouseleave",()=>{t.classList.remove("shadow-lg","shadow-blue-500/10")})})}}function x(){m(),w(),y(),g(),h(),v.init()}document.addEventListener("DOMContentLoaded",x);
