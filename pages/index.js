import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  TableCell,
} from '@material-ui/core';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { Store } from '../utils/Store';

import db from '../utils/db';
import Course from '../models/Course';

export default function Home(props) {
  const { courses, quote } = props; 
  console.log('test fetch external api: ', quote)

  const router = useRouter();
  //const { state, dispatch } = useContext(Store);
  
  useEffect(() => {
    console.log('1st index page')
  }, []);

  return (
    <Layout>
      <div><br/>
        <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center" >
          Index Page
        </Grid>

        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item md={4} key={course.courseName}>
              <Card>
              <NextLink href={`/course/${course._id}`} passHref>
                  <CardActionArea>
                    {/* <CardMedia
                      component="img"
                      image={course.category}
                      title={course.section}
                    ></CardMedia> */}
                    <CardContent>
                      <Typography><b>Course Name:</b> {course.courseName}</Typography>
                      <Typography><b>Category:</b> {course.category}</Typography>
                      <Typography><b>Section:</b> {course.section}</Typography>
                      <Typography><b>Description:</b> {course.description}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
        
              </Card>
            </Grid>
          ))}
        </Grid>

      </div>
    </Layout>
  );
}

export async function getServerSideProps() { // (Server-side Rendering): จะถูก Run ทุกครั้งที่ Page ถูก Refresh
  await db.connect();
  const courses = await Course.find({}).lean();
  console.log(courses)
  await db.disconnect();
  // test fetch data from external api
  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=tether-gold&vs_currencies=usd`); // test fetch external data
  const quoteData = await res.json();
  return {
    props: {
      courses: courses.map(db.convertDocToObj),
      quote: quoteData,
    },
    // revalidate: 10 // when the production we will fetch data every 10 second. 
  };
}