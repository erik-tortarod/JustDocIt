function HighlighSubString({ text, search }: { text: string; search: string }) {
	const textAsString = text.toString();
	const start = textAsString.toLowerCase().indexOf(search.toLowerCase());

	if (start === -1 || !search) {
		return <>{text}</>;
	}

	const end = start + search.length;

	const textBefore = textAsString.substring(0, start);
	const textToken = textAsString.substring(start, end);
	const textAfter = textAsString.substring(end);

	return (
		<span>
			{textBefore}
			<span className="text-red-500 border-b-1">{textToken}</span>
			{textAfter}
		</span>
	);
}

export default HighlighSubString;
