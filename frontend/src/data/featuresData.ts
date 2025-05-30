import { useTranslation } from 'react-i18next';

/**
 * List of application features.
 */
export const useFeatures = () => {
	const { t } = useTranslation();

	return [
		{
			icon: "🔗",
			title: t('features.github.title'),
			description: t('features.github.description'),
		},
		{
			icon: "🌐",
			title: t('features.online.title'),
			description: t('features.online.description'),
		},
		{
			icon: "🔄",
			title: t('features.languages.title'),
			description: t('features.languages.description'),
		},
		{
			icon: "📊",
			title: t('features.quality.title'),
			description: t('features.quality.description'),
		},
		{
			icon: "🔗",
			title: t('features.deploy.title'),
			description: t('features.deploy.description'),
		},
		{
			icon: "👥",
			title: t('features.collaboration.title'),
			description: t('features.collaboration.description'),
		},
	];
};

/**
 * Steps for using the application.
 */
export const useSteps = () => {
	const { t } = useTranslation();

	return [
		{
			number: 1,
			title: t('features.steps.step1.title'),
			description: t('features.steps.step1.description'),
			highlight: t('features.steps.step1.highlight'),
		},
		{
			number: 2,
			title: t('features.steps.step2.title'),
			description: t('features.steps.step2.description'),
			highlight: t('features.steps.step2.highlight'),
		},
		{
			number: 3,
			title: t('features.steps.step3.title'),
			description: t('features.steps.step3.description'),
			highlight: t('features.steps.step3.highlight'),
		},
		{
			number: 4,
			title: t('features.steps.step4.title'),
			description: t('features.steps.step4.description'),
			highlight: t('features.steps.step4.highlight'),
		},
	];
};
