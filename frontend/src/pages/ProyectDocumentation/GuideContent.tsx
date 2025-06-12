import { motion } from "framer-motion";
import { BookOpen, Code2, FileText, Github } from "lucide-react";
import { DocContent } from "./types";
import { useTranslation } from "react-i18next";

const GuideContent = () => {
   const { t } = useTranslation();

   return {
      emoji: "📚",
      title: t("documentation.guide.title"),
      description: t("documentation.guide.description"),
      sections: [
         {
            title: t("documentation.guide.howToUse.title"),
            content: (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                     {
                        icon: <Github className="h-6 w-6" />,
                        title: t(
                           "documentation.guide.howToUse.steps.connect.title"
                        ),
                        description: t(
                           "documentation.guide.howToUse.steps.connect.description"
                        ),
                     },
                     {
                        icon: <Code2 className="h-6 w-6" />,
                        title: t(
                           "documentation.guide.howToUse.steps.select.title"
                        ),
                        description: t(
                           "documentation.guide.howToUse.steps.select.description"
                        ),
                     },
                     {
                        icon: <FileText className="h-6 w-6" />,
                        title: t(
                           "documentation.guide.howToUse.steps.learn.title"
                        ),
                        description: t(
                           "documentation.guide.howToUse.steps.learn.description"
                        ),
                     },
                     {
                        icon: <BookOpen className="h-6 w-6" />,
                        title: t(
                           "documentation.guide.howToUse.steps.generate.title"
                        ),
                        description: t(
                           "documentation.guide.howToUse.steps.generate.description"
                        ),
                     },
                  ].map((step, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                     >
                        <div className="flex items-center space-x-4 mb-4">
                           <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                              {step.icon}
                           </div>
                           <h3 className="text-lg font-semibold">
                              {step.title}
                           </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                           {step.description}
                        </p>
                     </motion.div>
                  ))}
               </div>
            ),
            explanation: t("documentation.guide.howToUse.explanation"),
         },
         {
            title: t("documentation.guide.features.title"),
            content: (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                     {
                        title: t(
                           "documentation.guide.features.items.multiLanguage.title"
                        ),
                        description: t(
                           "documentation.guide.features.items.multiLanguage.description"
                        ),
                     },
                     {
                        title: t(
                           "documentation.guide.features.items.github.title"
                        ),
                        description: t(
                           "documentation.guide.features.items.github.description"
                        ),
                     },
                     {
                        title: t(
                           "documentation.guide.features.items.realtime.title"
                        ),
                        description: t(
                           "documentation.guide.features.items.realtime.description"
                        ),
                     },
                  ].map((feature, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
                     >
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                           {feature.description}
                        </p>
                     </motion.div>
                  ))}
               </div>
            ),
            explanation: t("documentation.guide.features.explanation"),
         },
      ],
   };
};

export default GuideContent;
