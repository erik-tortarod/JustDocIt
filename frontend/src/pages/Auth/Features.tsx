import { features, steps } from "../../data/featuresData";

function Features() {
   return (
      <section className="mx-auto py-20 px-4 w-screen ">
         <h2 className="text-3xl font-bold text-center mb-16 relative">
            <span className="relative inline-block">
               Todo lo que necesitas, desde tu navegador
               <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary opacity-30"></span>
            </span>
         </h2>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:px-16">
            {features.map((feature, index) => (
               <div
                  key={index}
                  className="bg-base-200 p-8 rounded-lg border border-base-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
               >
                  <div className="w-12 h-12 bg-primary/20 text-primary flex items-center justify-center rounded-xl text-2xl mb-6">
                     {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                     {feature.title}
                  </h3>
                  <p className="text-base-content/70">{feature.description}</p>
               </div>
            ))}
         </div>

         {/* How it works section */}
         <div className="mt-32 mb-12">
            <h2 className="text-3xl font-bold text-center mb-16 relative">
               <span className="relative inline-block">
                  ¿Cómo funciona?
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary opacity-30"></span>
               </span>
            </h2>

            <div className="max-w-3xl mx-auto relative">
               {/* Vertical timeline line */}
               <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-primary to-secondary opacity-30"></div>

               <div className="space-y-16">
                  {steps.map((step, index) => (
                     <div key={index} className="flex gap-8">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center font-bold text-xl z-10 flex-shrink-0">
                           {step.number}
                        </div>
                        <div className="pt-2">
                           <h3 className="text-2xl font-semibold mb-4">
                              {step.title}
                           </h3>
                           <p className="text-base-content/70">
                              {step.description}{" "}
                              <span className="text-primary">
                                 {step.highlight}
                              </span>
                              ,
                              {step.number === 1 &&
                                 " sin necesidad de instalar aplicaciones adicionales."}
                              {step.number === 2 &&
                                 " sin necesidad de descargarlo a tu máquina local."}
                              {step.number === 3 &&
                                 " sin archivos de configuración complejos."}
                              {step.number === 4 &&
                                 " con conexión a internet, sin instalaciones adicionales."}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="mt-32 text-center">
            <h2 className="text-4xl font-bold mb-6">
               Documenta tu código hoy mismo
            </h2>
            <p className="text-lg text-base-content/70 mb-10 max-w-2xl mx-auto">
               Únete a miles de desarrolladores que confían en CodeDocs para
               crear documentación profesional sin salir del navegador. Sin
               instalaciones, sin complicaciones.
            </p>
            <div className="flex gap-6 justify-center">
               <button className="btn btn-primary btn-lg">
                  Comenzar gratis
               </button>
               <button className="btn btn-outline btn-lg">
                  Ver planes Premium
               </button>
            </div>
         </div>
      </section>
   );
}

export default Features;
