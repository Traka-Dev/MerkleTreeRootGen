import Head from "next/head"

export const HeadPage = ({
  title = "Root Generator",
  description = "",
  favIconUrl = "/favicon.ico",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={favIconUrl} />
    </Head>
  )
}
