import { motion, AnimatePresence } from "framer-motion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";
import CodeBlock from "../../components/ui/code-block";
import { LanguageDocs } from "./types";
import { languageMap } from "./types";

interface MainContentProps {
	activeTab: string;
	docs: LanguageDocs;
}

export const MainContent = ({ activeTab, docs }: MainContentProps) => {
	return (
		<ScrollArea className="flex-1 bg-base-200">
			<div className="p-8 max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl font-bold mb-4 text-base-content">
						Project Documentation Guide
					</h1>
					<p className="text-lg text-base-content/70">
						Learn how to document your code effectively in different programming
						languages
					</p>
				</motion.div>

				<AnimatePresence mode="wait">
					{Object.entries(docs).map(
						([lang, doc]) =>
							activeTab === lang && (
								<motion.div
									key={lang}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.3 }}
								>
									<Card className="bg-base-100 border border-base-300 shadow-lg">
										<CardHeader>
											<motion.div
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.2 }}
												className="flex items-center space-x-4"
											>
												<span className="text-4xl text-primary">
													{doc.emoji}
												</span>
												<div>
													<CardTitle className="text-2xl text-base-content">
														{doc.title}
													</CardTitle>
													<CardDescription className="text-lg text-base-content/70">
														{doc.description}
													</CardDescription>
												</div>
											</motion.div>
										</CardHeader>
										<CardContent>
											<div className="space-y-12">
												{doc.sections.map((section, index) => (
													<motion.div
														key={index}
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ delay: index * 0.1 }}
														className="space-y-4"
													>
														<div className="flex items-center space-x-2">
															<Badge variant="secondary" className="text-sm">
																{index + 1}
															</Badge>
															<h3 className="text-xl font-semibold text-base-content">
																{section.title}
															</h3>
														</div>
														<p className="text-base-content/70 mb-6">
															{section.explanation}
														</p>
														{typeof section.content === "string" ? (
															<motion.div
																whileHover={{ scale: 1.01 }}
																className="rounded-lg overflow-hidden shadow-lg border border-base-300"
															>
																<CodeBlock
																	code={section.content}
																	language={
																		languageMap[
																			lang as keyof typeof languageMap
																		]
																	}
																/>
															</motion.div>
														) : (
															section.content
														)}
													</motion.div>
												))}
											</div>
										</CardContent>
									</Card>
								</motion.div>
							),
					)}
				</AnimatePresence>
			</div>
		</ScrollArea>
	);
};
