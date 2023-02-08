import { NextPageWithLayout } from "../_app"
import { ReactElement } from 'react'
import { MainLayout } from "@/layouts/MainLayout"
import axios from "axios"
import { Article } from "@/models/Article"
import { Grid, Heading } from "@chakra-ui/react"
import { AppContainer } from "@/components/AppContainer/AppContainer"
import { ArticleCard } from "@/components/ArticleCard/ArticleCard"
import { GetServerSidePropsContext } from "next"

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const articles = await axios.get('http://localhost:5000/api/articles?' + `subjectId=${context.query.subjectId}`).then(res => res.data)

  return {
    props: {
      articles
    }
  }
}

interface ArticlesPageProps {
  articles: Article[]
}

const ArticlesPage: NextPageWithLayout<ArticlesPageProps> = ({ articles }) => {
    return (
      <AppContainer>
        <Grid templateColumns="repeat(3, 1fr)" gap={15} pb={15} pt={15}>
          {articles?.map(r => (
            <ArticleCard {...r} key={r.id} />
          ))}
        </Grid>

        {articles.length === 0 && (
          <Heading maxW="1200" color="blue.400">Кажется, ни одной статьи еще не выложено.<br /> Ожидайте! Мы работаем над этим</Heading>
        )}
      </AppContainer>
    )
}

ArticlesPage.getLayout = function getLayout(page: ReactElement) {
    return (
      <MainLayout>
        {page}
      </MainLayout>
    )
}

export default ArticlesPage