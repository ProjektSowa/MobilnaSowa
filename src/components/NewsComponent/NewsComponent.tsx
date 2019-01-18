import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Image, Text, TouchableOpacity, Linking} from 'react-native';
import {parse, HTMLElement, Node} from 'node-html-parser';
import {Button, Fab, Icon} from "native-base";

let url = "http://testsowa.pswbp.pl/";

let getHtmlFromUrl = async function(url: string) {
  let response = await fetch(url);
  return response.text();
}

let getDomFromHtml = function(html: string) {
  return parse(html);
}

let getNewsFromDom = function(dom: HTMLElement) {
  return dom.querySelectorAll('.news-record-box');
}

let getNewsTitles = function(nodes: Node[]) {
  let rawTitles: string[] = [];
  nodes.forEach(node => {
    rawTitles.push(node.childNodes[3].text);
  });

  let titles: string[] = [];
  for (let i = 0; i < 5; i++) {
    titles.push(rawTitles[i].trim());
  }

  return titles;
}

let getNewsImagesHrefs = function(nodes: Node[]) {
  let rawImagesHrefs: string[] = [];
  nodes.forEach(node => {
    rawImagesHrefs.push(node.toString().toString());
  });

  let imagesHrefs: string[] = [];
  rawImagesHrefs.forEach(rawImageHref => {
    let matches = rawImageHref.match(/((data\/cache\/default\/sowa\/)([\S\s]){1,}(\.jpg))/);
    if (matches) {
      imagesHrefs.push(url + matches[0]);
    }
  });

  return imagesHrefs;
}

let getNewsHrefs = function(nodes: Node[]) {
  let rawNewsHrefs: string[] = [];
  nodes.forEach(node => {
    rawNewsHrefs.push(node.toString().toString());
  });

  let newsHrefs: string[] = [];
  rawNewsHrefs.forEach(rawNewsHref => {
    let matches = rawNewsHref.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/);
    if (matches) {
      let url = matches[0].substr(0, 45).concat(matches[0].substr(49, matches[0].length - 51));
      newsHrefs.push(url);
    }
  });

  return newsHrefs;
}

interface DataItem {
  title: string,
  image: string,
  href: string,
}

interface NewsProps {

}

interface IState {
  data: DataItem[],
    fabActive : boolean
}

export class NewsComponent extends Component<NewsProps, IState> {
  constructor(props: NewsProps) {
    super(props);

    this.state = {
      data: [],
        fabActive : false
    };

    getHtmlFromUrl(url)
    .then(html => {
      let news = getNewsFromDom(getDomFromHtml(html));

      let titles = getNewsTitles(news);
      let images = getNewsImagesHrefs(news);
      let hrefs = getNewsHrefs(news);

      let data: DataItem[] = [];
      for (let i = 0; i < titles.length; i++) {
        data.push({title: titles[i], image: images[i], href: hrefs[i]});
      }

      return data;
    })
    .then(d => {
      this.setState({
        data: d,
      });
    });
  }

  render() {
    return (
      <View style = {styles.container}>
        <FlatList
          data = {this.state.data}
          renderItem = {({item}) =>
            <TouchableOpacity onPress = {() => {
              Linking.canOpenURL(item.href).then(supported => {
                if (supported) {
                  Linking.openURL(item.href);
                };
              });
            }}>
              <View style = {styles.item}>
                <Image style = {styles.image}
                  source = {{uri: item.image}}
                />
                <Text style = {styles.text}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          }
          keyExtractor = {(item) => item.title}
        />
        <Fab
	        active={this.state.fabActive}
	        direction="up"
	        containerStyle={{ }}
	        style={{ backgroundColor: '#5067FF' }}
	        position="bottomRight">
	        <Icon name="share" />
	        <Button style={{ backgroundColor: '#34A34F' }}>
		        <Icon name="logo-whatsapp" />
	        </Button>
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    minHeight: 180,
    padding: '1%',
    borderWidth: 1,
    marginBottom: '1%',
    marginLeft: '1%',
    marginRight: '1%',
    backgroundColor:'#eeffdd',
  },
  image: {
    width: '33%',
    marginBottom: '1%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '60%',
    padding: '2%',
  },
})