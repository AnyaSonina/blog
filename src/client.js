import sanityClient from "@sanity/client"

export default sanityClient ({
  projectId: "sbjzcldj",
  dataset: "production",
  apiVersion: '2021-08-31', 
  useCdn: true
})