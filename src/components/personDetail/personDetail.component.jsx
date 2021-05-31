import React, { Component } from 'react';
import DetailNav from '../detail-nav/detail-nav.component';
import BlanketElement from '../blanket-element/blanket-element.component';
import ExpandableImage from '../expandableImage/expandableImage.component';
import { Redirect } from 'react-router-dom';
import PersonCreditCategory from '../personCreditCategory/personCreditCategory.component';
import KnownForCard from '../known/knownForCard.component';
import SocialMediaHandles from '../socialMediaHandles/socialMediaHandles.component';
import './personDetail.styles.scss';

class PersonDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personDetail: [],
      personID: this.props.match.params['personDetail']
        .match(/\d{2,}/g)
        .join(''),
      combinedCredits: [],
      externalID: {},
      isLoading: true,
      checkboxDisplay: false,
      id: 0,
      checkboxData: {},
      checkboxPending: false,
      showLabel: { title: '', character: '' },
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/person/${this.state.personID}?api_key=${process.env.REACT_APP_API_URL}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/person/${this.state.personID}/combined_credits?api_key=${process.env.REACT_APP_API_URL}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/person/${this.state.personID}/external_ids?api_key=${process.env.REACT_APP_API_URL}&language=en-US`
      ),
    ])
      .then(([personDetail, combinedCredits, externalID]) =>
        Promise.all([
          personDetail.json(),
          combinedCredits.json(),
          externalID.json(),
        ])
      )
      .then(([personDetail, combinedCredits, externalID]) =>
        this.setState({ personDetail, combinedCredits, externalID })
      )
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  }

  render() {
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
    } = this.state.personDetail;
    const { cast, crew } = this.state.combinedCredits;
    const { facebook_id, instagram_id, twitter_id } = this.state.externalID;
    console.log('combinedCredits', this.state.combinedCredits);
    console.log('cast', cast);
    console.log('crew', crew);
    console.log('personDetail', this.state.personDetail);
    console.log('externalID', this.state.externalID);
    let sortedCast = [];
    let sortedYear = [];
    if (cast) {
      cast.forEach((hcast) => {
        if (
          !sortedYear.includes(
            new Date(hcast.release_date || hcast.first_air_date).getFullYear()
          )
        ) {
          if (hcast.release_date || hcast.first_air_date) {
            let ket = cast.filter(
              (jcast) =>
                new Date(
                  hcast.release_date || hcast.first_air_date
                ).getFullYear() ===
                new Date(
                  jcast.release_date || jcast.first_air_date
                ).getFullYear()
            );
            sortedCast.push(ket);
            sortedYear.push(
              new Date(hcast.release_date || hcast.first_air_date).getFullYear()
            );
          } else {
            let ket = cast.filter(
              (jcast) => !jcast.release_date && !jcast.first_air_date
            );

            sortedCast.push(ket);
            sortedYear.push(
              new Date(hcast.release_date || hcast.first_air_date).getFullYear()
            );
          }
        }
      });
    }

    let moviesKnownFor = [];
    let productionList = [];
    let sortedCastYear = [];
    let productionListYear = [];
    let crewListYear = [];
    let directingListYear = [];
    let productionYear = [];
    let crewList = [];
    let crewYear = [];
    let directingList = [];
    let directingYear = [];
    if (cast) {
      moviesKnownFor = cast
        .sort((a, b) => b.vote_count - a.vote_count)
        .filter((cast, index) => index <= 8);
    }
    if (crew) {
      let productionCast = crew.filter(
        (prod) => prod.department === 'Production'
      );
      productionCast.forEach((hcast) => {
        if (
          !productionYear.includes(
            new Date(hcast.release_date || hcast.first_air_date).getFullYear()
          )
        ) {
          if (hcast.release_date || hcast.first_air_date) {
            let ket = productionCast.filter(
              (jcast) =>
                new Date(
                  hcast.release_date || hcast.first_air_date
                ).getFullYear() ===
                new Date(
                  jcast.release_date || jcast.first_air_date
                ).getFullYear()
            );
            productionList.push(ket);
            productionYear.push(
              new Date(hcast.release_date || hcast.first_air_date).getFullYear()
            );
          } else {
            let ket = productionCast.filter(
              (jcast) => !jcast.release_date && !jcast.first_air_date
            );

            productionList.push(ket);
            productionYear.push(
              new Date(hcast.release_date || hcast.first_air_date).getFullYear()
            );
          }
        }
      });
    }
    if (crew) {
      let crewCast = crew.filter((prod) => prod.department === 'Crew');
      crewCast.forEach((hcast) => {
        if (
          !crewYear.includes(
            new Date(hcast.release_date || hcast.first_air_date).getFullYear()
          )
        ) {
          let ket = crewCast.filter(
            (jcast) =>
              new Date(
                hcast.release_date || hcast.first_air_date
              ).getFullYear() ===
              new Date(jcast.release_date || jcast.first_air_date).getFullYear()
          );
          crewList.push(ket);
          crewYear.push(
            new Date(hcast.release_date || hcast.first_air_date).getFullYear()
          );
        }
      });
    }

    if (crew) {
      let directingCast = crew.filter(
        (prod) => prod.department === 'Directing'
      );
      directingCast.forEach((hcast) => {
        if (
          (hcast.release_date === '' || hcast.first_air_date === '') &&
          !crewYear.includes(
            new Date(hcast.release_date || hcast.first_air_date).getFullYear()
          )
        ) {
          let ket = directingCast.filter(
            (jcast) => jcast.release_date === '' || jcast.first_air_date === ''
          );
          directingList.push(ket);
          directingYear.push();
        }
        if (
          !crewYear.includes(
            new Date(hcast.release_date || hcast.first_air_date).getFullYear()
          )
        ) {
          let ket = directingCast.filter(
            (jcast) =>
              new Date(
                hcast.release_date || hcast.first_air_date
              ).getFullYear() ===
              new Date(jcast.release_date || jcast.first_air_date).getFullYear()
          );
          directingList.push(ket);
          directingYear.push(
            new Date(hcast.release_date || hcast.first_air_date).getFullYear()
          );
        }
      });
    }

    if (sortedCast.length) {
      sortedCastYear = sortedCast.map((item) =>
        item.sort(
          (a, b) =>
            parseInt(
              a.release_date
                ? a.release_date.replace(/-/g, '')
                : a.first_air_date
                ? a.first_air_date.replace(/-/g, '')
                : 0
            ) -
            parseInt(
              b.release_date
                ? b.release_date.replace(/-/g, '')
                : b.first_air_date
                ? b.first_air_date.replace(/-/g, '')
                : 0
            )
        )
      );
    }

    if (productionList.length) {
      productionListYear = productionList.map((item) =>
        item.sort(
          (a, b) =>
            parseInt(
              a.release_date
                ? a.release_date.replace(/-/g, '')
                : a.first_air_date
                ? a.first_air_date.replace(/-/g, '')
                : 0
            ) -
            parseInt(
              b.release_date
                ? b.release_date.replace(/-/g, '')
                : b.first_air_date
                ? b.first_air_date.replace(/-/g, '')
                : 0
            )
        )
      );
    }

    if (crewList.length) {
      crewListYear = crewList.map((item) =>
        item.sort(
          (a, b) =>
            parseInt(
              a.release_date
                ? a.release_date.replace(/-/g, '')
                : a.first_air_date
                ? a.first_air_date.replace(/-/g, '')
                : 0
            ) -
            parseInt(
              b.release_date
                ? b.release_date.replace(/-/g, '')
                : b.first_air_date
                ? b.first_air_date.replace(/-/g, '')
                : 0
            )
        )
      );
    }

    if (directingList.length) {
      directingListYear = directingList.map((item) =>
        item.sort(
          (a, b) =>
            parseInt(
              a.release_date
                ? a.release_date.replace(/-/g, '')
                : a.first_air_date
                ? a.first_air_date.replace(/-/g, '')
                : 0
            ) -
            parseInt(
              b.release_date
                ? b.release_date.replace(/-/g, '')
                : b.first_air_date
                ? b.first_air_date.replace(/-/g, '')
                : 0
            )
        )
      );
    }

    if (sortedCastYear.length) {
      sortedCastYear = sortedCastYear.sort(
        (a, b) =>
          parseInt(
            b[0].release_date
              ? b[0].release_date.replace(/-/g, '')
              : b[0].first_air_date
              ? b[0].first_air_date.replace(/-/g, '')
              : 500000000
          ) -
          parseInt(
            a[0].release_date
              ? a[0].release_date.replace(/-/g, '')
              : a[0].first_air_date
              ? a[0].first_air_date.replace(/-/g, '')
              : 500000000
          )
      );
    }

    if (productionListYear.length) {
      productionListYear = productionListYear.sort(
        (a, b) =>
          parseInt(
            b[0].release_date
              ? b[0].release_date.replace(/-/g, '')
              : b[0].first_air_date
              ? b[0].first_air_date.replace(/-/g, '')
              : 500000000
          ) -
          parseInt(
            a[0].release_date
              ? a[0].release_date.replace(/-/g, '')
              : a[0].first_air_date
              ? a[0].first_air_date.replace(/-/g, '')
              : 500000000
          )
      );
    }

    if (crewListYear.length) {
      crewListYear = crewListYear.sort(
        (a, b) =>
          parseInt(
            b[0].release_date
              ? b[0].release_date.replace(/-/g, '')
              : b[0].first_air_date
              ? b[0].first_air_date.replace(/-/g, '')
              : 500000000
          ) -
          parseInt(
            a[0].release_date
              ? a[0].release_date.replace(/-/g, '')
              : a[0].first_air_date
              ? a[0].first_air_date.replace(/-/g, '')
              : 500000000
          )
      );
    }

    if (directingListYear.length) {
      directingListYear = directingListYear.sort((a, b) => {
        if (a.length < 1 || b.length < 1) {
          return a - b;
        }
        // if (b.length < 1) {
        //   return;
        // }
        return (
          parseInt(
            b[0].release_date
              ? b[0].release_date.replace(/-/g, '')
              : b[0].first_air_date
              ? b[0].first_air_date.replace(/-/g, '')
              : 500000000
          ) -
          parseInt(
            a[0].release_date
              ? a[0].release_date.replace(/-/g, '')
              : a[0].first_air_date
              ? a[0].first_air_date.replace(/-/g, '')
              : 500000000
          )
        );
      });
    }

    const checkboxOnClick = (event) => {
      const { value } = event.target;
      const formattedValue = value.split(',');
      console.log({formattedValue})
      this.setState({
        showLabel: { title: formattedValue[0], character: parseInt(formattedValue[1]) },
      });
    };

    console.log('sortedCastYear', sortedCastYear);
    console.log('productionList:', productionList);
    console.log('crewList:', crewList);
    console.log('directingList:', directingList);
    console.log('check:', this.state.checkboxData);
    const { isLoading } = this.state;
    return this.state.personDetail.status_message ? (
      <Redirect to='/404-page_not_found' />
    ) : !cast ? (
      <BlanketElement isLoading={isLoading} />
    ) : (
      <div className='person-detail' onClick={() => this.setState({showLabel: {title: '', character: ''}})}>
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
              {moviesKnownFor.length ? (
                <div className='right-section-known-for'>
                  <h5 className='known-for-header'>Known For</h5>
                  <div className='known-for-scroll'>
                    <div className='known-for-scroll-container'>
                      {moviesKnownFor.map(
                        ({ poster_path, title, name, id, movieType }) => (
                          <KnownForCard
                            key={id}
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
                  year={sortedCastYear}
                  checkboxOnClick={checkboxOnClick}
                  showLabel={this.state.showLabel}
                  dropdwon={true}
                  category={'Acting'}
                />
                <PersonCreditCategory
                  year={productionListYear}
                  checkboxOnClick={checkboxOnClick}
                  showLabel={this.state.showLabel}
                  dropdwon={false}
                  category={'Production'}
                />
                <PersonCreditCategory
                  year={crewListYear}
                  checkboxOnClick={checkboxOnClick}
                  showLabel={this.state.showLabel}
                  dropdwon={false}
                  category={'Crew'}
                />
                <PersonCreditCategory
                  year={directingListYear}
                  checkboxOnClick={checkboxOnClick}
                  showLabel={this.state.showLabel}
                  dropdwon={false}
                  category={'Directing'}
                />
              </section>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default PersonDetail;
