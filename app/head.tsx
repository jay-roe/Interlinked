export default function Head() {
  return (
    <>
      <title data-testid="head-title">Interlinked</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Connect with like minded tech enthusiasts for making friends or finding job oppurtunities! "
      />
      <link rel="shortcut icon" href="/interlinked-logo.ico"></link>
      <link rel="icon" href="/interlinked-logo.ico" />

      <meta property="og:title" content="Interlinked" />
      <meta
        property="og:description"
        content="Connect with like minded tech enthusiasts for making friends or finding job oppurtunities!"
      />
      <meta name="image" property="og:image" content="/interlinked-logo.ico" />
      <meta property="og:url" content="https://interlinked.live/" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="1200" />
      <meta property="og:type" content="website" />
      <meta name="theme-color" content="#130921" />

      <meta property="twitter:title" content="Interlinked" />
      <meta property="twitter:url" content="https://interlinked.live/" />
      <meta property="twitter:image" content="/interlinked-logo.ico" />
      <meta name="twitter:card" content="summary_large_image"></meta>
    </>
  );
}
