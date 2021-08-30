import React, { useState, useEffect, useCallback } from 'react';
import DetailNav from '../detail-nav/detail-nav.component';
import PageLoader from '../PageLoader/PageLoader.component';
import ExpandableImage from '../expandableImage/expandableImage.component';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PersonCreditCategory from '../personCreditCategory/personCreditCategory.component';
import KnownForCard from '../known/knownForCard.component';
import SocialMediaHandles from '../socialMediaHandles/socialMediaHandles.component';
import {
  sortedCastYearNew,
  productionCrewDirecting,
} from '../../assets/personDataFormatted';
import './personDetail.styles.scss';

const PersonDetail = () => {
  const { person } = useParams();
  const [personData, setPersondata] = useState({
    personDetail: [],
    personID: person.match(/\d{2,}/g).join(''),
    combinedCredits: [],
    externalID: {},
    isLoading: true,
    id: 0,
    showLabel: { title: '', character: '' },
  });

  const {
    personDetail,
    personID,
    externalID,
    combinedCredits,
    isLoading,
    showLabel,
  } = personData;

  const {
    birthday,
    known_for_department,
    deathday,
    name,
    also_known_as,
    gender,
    biography,
    place_of_birth,
    profile_path,
  } = personDetail;

  const { cast, crew } = combinedCredits;

  const { facebook_id, instagram_id, twitter_id } = externalID;

  const [formattedData, setFormattedData] = useState({
    sortedCastYear: [],
    moviesKnownFor: [],
    productionListYear: [],
    crewListYear: [],
    directingListYear: [],
  });

  const fetchData = useCallback(() => {
    setPersondata((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/person/${personID}?api_key=${process.env.REACT_APP_API_URL}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/person/${personID}/combined_credits?api_key=${process.env.REACT_APP_API_URL}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/person/${personID}/external_ids?api_key=${process.env.REACT_APP_API_URL}&language=en-US`
      ),
    ])
      .then(([personDetail, combinedCredits, externalID]) =>
        Promise.all([
          personDetail.json(),
          combinedCredits.json(),
          externalID.json(),
        ])
      )
      .then(async ([personDetail, combinedCredits, externalID]) => {
        setPersondata((prevState) => ({
          ...prevState,
          personDetail,
          combinedCredits,
          externalID,
        }));

        await setFormattedData((prevState) => ({
          ...prevState,
          moviesKnownFor: combinedCredits.cast
            .sort((a, b) => b.vote_count - a.vote_count)
            .filter((cast, index) => index <= 8),
          sortedCastYear: sortedCastYearNew(combinedCredits.cast),
          productionListYear: productionCrewDirecting(
            combinedCredits.crew,
            'Production'
          ),
          crewListYear: productionCrewDirecting(combinedCredits.crew, 'Crew'),
          directingListYear: productionCrewDirecting(
            combinedCredits.crew,
            'Directing'
          ),
        }));
      })
      .catch((err) => {
        setPersondata((prevState) => ({
          ...prevState,
          isLoading: false,
          personDetail: err,
        }));
        // console.log(err);
      });
  }, [personID]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);

  const checkboxOnClick = (event) => {
    const { value } = event.target;
    const formattedValue = value.split(',');
    // console.log({ formattedValue });
    setPersondata((prevState) => ({
      ...prevState,
      showLabel: {
        title: formattedValue[0],
        character: parseInt(formattedValue[1]),
      },
    }));
  };

  // console.log({
  //   combinedCredits,
  //   cast,
  //   crew,
  //   personDetail,
  //   externalID,
  //   formattedData,
  // });

  return personDetail.status_message ? (
    <Redirect to='/404-page_not_found' />
  ) : !cast ? (
    <PageLoader isLoading={isLoading} refetchData={fetchData} />
  ) : (
    <div
      className='person-detail'
      onClick={() =>
        setPersondata((prevState) => ({
          ...prevState,
          showLabel: { title: '', character: '' },
        }))
      }
    >
      <DetailNav />
      <section className='person-detail-section'>
        <div className='person-detail-left-section'>
          <div className='person-detail-left-section-img'>
            <ExpandableImage posterPath={profile_path} stream={false} />
          </div>
          <div className='personal-info'>
            <div className='person-detail-left-section-head'>
              <h1 className='right-section-header'>{name}</h1>
            </div>
            <SocialMediaHandles
              facebook_id={facebook_id}
              twitter_id={twitter_id}
              instagram_id={instagram_id}
              homepage={''}
              center= {true}
            />
            <h4 className='personal-info-header'>Personal Info</h4>
            {known_for_department ? (
              <div className='info'>
                <p className='info-header'>Known For</p>
                <p className='info-content'>{known_for_department}</p>
              </div>
            ) : (
              ''
            )}
            {cast.length + crew.length ? (
              <div className='info'>
                <p className='info-header'>Known Credits</p>
                <p className='info-content'>{cast.length + crew.length}</p>
              </div>
            ) : (
              ''
            )}
            {gender ? (
              <div className='info'>
                <p className='info-header'>Gender</p>
                <p className='info-content'>
                  {gender === 1 ? 'female' : 'male'}
                </p>
              </div>
            ) : (
              ''
            )}
            {birthday ? (
              <div className='info'>
                <p className='info-header'>Birthday</p>
                <p className='info-content'>{`${birthday} (${parseInt(
                  (new Date().getTime() - new Date(birthday).getTime()) /
                    (1000 * 3600 * 24 * 365.25)
                )} years old)`}</p>
              </div>
            ) : (
              ''
            )}
            {deathday ? (
              <div className='info'>
                <p className='info-header'>Day of Death</p>
                <p className='info-content'>{deathday}</p>
              </div>
            ) : (
              ''
            )}
            {place_of_birth ? (
              <div className='info'>
                <p className='info-header'>Place of Birth</p>
                <p className='info-content'>{place_of_birth}</p>
              </div>
            ) : (
              ''
            )}
            {also_known_as.length ? (
              <div className='info'>
                <p className='info-header'>Also Known As</p>
                <div className='also-known-as'>
                  {also_known_as
                    ? also_known_as.map((item, index) => (
                        <div key={index}>{item}</div>
                      ))
                    : ''}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='person-detail-right-section'>
          <div className='right-container'>
            <h1 className='right-section-header'>{name}</h1>
            <div className='biography'>
              <h4 className='biography-header'>Biography</h4>
              <p className='biography-text'>
                {biography
                  ? biography
                  : `We don't have a biography for ${name}`}
              </p>
            </div>
            {formattedData.moviesKnownFor.length ? (
              <div className='right-section-known-for'>
                <h5 className='known-for-header'>Known For</h5>
                <div className='known-for-scroll'>
                  <div className='known-for-scroll-container'>
                    {formattedData.moviesKnownFor.map(
                      ({ poster_path, title, name, id, movieType }, index) => (
                        <KnownForCard
                          key={index}
                          title={title}
                          name={name}
                          poster_path={poster_path}
                          id={id}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            <section className='person-credits'>
              <PersonCreditCategory
                year={formattedData.sortedCastYear}
                checkboxOnClick={checkboxOnClick}
                showLabel={showLabel}
                dropdwon={true}
                category={'Acting'}
              />
              <PersonCreditCategory
                year={formattedData.productionListYear}
                checkboxOnClick={checkboxOnClick}
                showLabel={showLabel}
                dropdwon={false}
                category={'Production'}
              />
              <PersonCreditCategory
                year={formattedData.crewListYear}
                checkboxOnClick={checkboxOnClick}
                showLabel={showLabel}
                dropdwon={false}
                category={'Crew'}
              />
              <PersonCreditCategory
                year={formattedData.directingListYear}
                checkboxOnClick={checkboxOnClick}
                showLabel={showLabel}
                dropdwon={false}
                category={'Directing'}
              />
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonDetail;
