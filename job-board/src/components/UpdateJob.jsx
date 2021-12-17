import React, { Fragment } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
    Paper,
    Box,
    Grid,
    TextField,
    Typography,
    Button
  } from '@material-ui/core';
  
  const UpdateJob = (props) => {
    const location = useLocation();
    const job = location.state;
    
    const validationSchema = Yup.object().shape({
        jobtitle: Yup.string().required('Job title is required'),
        companyname: Yup.string()
          .required('Company name is required'),
        location: Yup.string()
          .required('Location is required'),
        description: Yup.string()
          .required('Description is required'),
        email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
        website: Yup.string()
      });

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = data => {
        const jobData = {
            title: data.jobtitle,
            companyName: data.companyname,
            location: data.location,
            description: data.description,
            employerEmailContact: data.email,
            companyWebsite: data.website
        };

        console.log("JOB DATA: ", jobData);

        const opt = {
            method: "POST",
            url: "/api/job/create",
            data: jobData,
            headers: { "content-type": "application/json" },
        };

        axios(opt)
            .then(response => { 
                if (response.status === 200) {
                    console.log("Create job response is: ", response);
                    alert("Job created successfully")
                    // navigate('/');
                }
            })
            .catch(error => console.log("Create job failed: ", error.message));
    };

    return (
      <Fragment>
        <Paper>
          <Box px={3} py={2}>
            <Typography variant="h6" align="center" margin="dense">
              Update Job
            </Typography>

            <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id=""
                name="jobtitle"
                label="Job Title"
                fullWidth
                margin="dense"
                {...register('jobtitle')}
                error={errors.jobtitle ? true : false}
                defaultValue={job.title}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.jobtitle?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="companyname"
                name="companyname"
                label="Company Name"
                fullWidth
                margin="dense"
                {...register('companyname')}
                error={errors.companyname ? true : false}
                defaultValue={job.companyName}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.companyname?.message}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="location"
                name="location"
                label="Location"
                type="location"
                fullWidth
                margin="dense"
                {...register('location')}
                error={errors.location ? true : false}
                defaultValue={job.location}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.location?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                type="description"
                fullWidth
                margin="dense"
                {...register('description')}
                error={errors.description ? true : false}
                defaultValue={job.description}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.description?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                margin="dense"
                {...register('email')}
                error={errors.email ? true : false}
                defaultValue={job.employerEmailContact}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                
                id="website"
                name="website"
                label="Website (optional)"
                fullWidth
                margin="dense"
                {...register('website')}
                error={errors.website ? true : false}
                defaultValue={job.companyWebsite}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.website?.message}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  );
};

export default UpdateJob;