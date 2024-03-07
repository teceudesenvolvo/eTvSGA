import React from 'react';
import '../App.css'
import ReactPlayer from 'react-player';

import { connect } from 'react-redux'
import { clickButton, LoggedOut } from '../store/actions/index'
import { bindActionCreators } from 'redux';

import axios from 'axios'


class Liveatual extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '566',
      tipo: 'aviso',
      avisos: [],
      carregar: 'Carregar Avisos',
      btnLoad: "visitanteBtn"
    }
  }


//   Autenticação
getAccessToken = async () => {
   
        axios.post(
            'https://oauth2.googleapis.com/token',
            {
                client_id: '690193859816-ptc7jnica28b58eh4p42gbrureu2pu13.apps.googleusercontent.com',
                client_secret: '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',
                refresh_token: 'ya29.a0AfB_byDfR4piaHb-nyjpU5_17F9m9xgMze_cmRXD0m6tTSIagfMgRV-iGJ4CyR0JaMHekrcvXGX_9Gbz-bDo9kk0JxwyndViCiwrqTlS674ZaoAKvd3gtF4QLsd_tW7i5JlgRJEIrq5f2elbYVKKzyHoYXtNQQFmRZYkaCgYKAWkSARESFQHGX2Mimg0fb2VOjhYygsdhVJY2SA0171',
                grant_type: 'refresh_token',
                scope: 'https://www.googleapis.com/auth/youtube.readonly',
                redirect_uri: 'https://tvcamara.cmsga.ce.gov.br/'
            }
        )
        .catch(err => console.log("Erro quando foi obter o acesso:", err))
        .then(response => {   
            console.log('O token de acesso', response.data.tokenAcess)     
            this.setState({
                tokenAcess: response.data.acess_token
            })
            
        })
         
   
};


fetchLiveStreams = (accessToken) => {

    const API_KEY = 'AIzaSyAvzOdQzU-H_tneJBcbVnmO60dEzWMKhT4';
    const CHANNEL_ID = '$UCjxnvUBYTWsp_zmkFKOvkQA';

    return axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then(response => {
        return console.log(response.data.items);
      }).catch(error => {
        console.error('Erro ao buscar live streams:', error);
        throw error;
      });

};

componentDidMount() {
    const loadPage = () => this.getAccessToken()
    loadPage()
  }



  render() {

    return (
      <div>
        <section>
          <div className="backgroundLaunch">
            <p>
             </p>
            <div className="curso-lancamento">
              
              <p>
              </p>
              <div className='videoLiveInicio'>
                <ReactPlayer className="watchVideo" scrolling="no" frameborder="0" onload="iFrameResize()"
                  url={`https://www.youtube.com/watch?v=FJgQa42w-L8`} controls='true' />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators({ clickButton, LoggedOut }, dispatch);
}

export default connect(null, mapDispatchToProps)(Liveatual);