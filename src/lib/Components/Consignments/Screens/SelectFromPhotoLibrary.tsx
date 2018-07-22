import React from "react"

import DoneButton from "../Components/BottomAlignedButton"
import ConsignmentBG from "../Components/ConsignmentBG"

import ImageSelection, { ImageData } from "../Components/ImageSelection"
import { BodyText as P } from "../Typography"

import { triggerCamera } from "lib/NativeModules/triggerCamera"

import {
  Alert,
  CameraRoll,
  Dimensions,
  Linking,
  NativeModules,
  NavigatorIOS,
  Route,
  ScrollView,
  View,
  ViewProperties,
} from "react-native"
import { ConsignmentSetup } from "../index"

const { ARCocoaConstantsModule, ARTakeCameraPhotoModule } = NativeModules

interface Props extends ViewProperties {
  navigator: NavigatorIOS
  route: Route
  setup: ConsignmentSetup
  updateWithPhotos: (photos: string[]) => void
}

interface State {
  cameraImages: ImageData[]
  lastCursor: string
  loadingMore: boolean
  noMorePhotos: boolean
  selection: Set<string>
}

const doneButtonStyles = {
  backgroundColor: "black",
  marginBottom: 20,
  paddingTop: 18,
  height: 56,
}

export default class SelectFromPhotoLibrary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const hasPhotos = props.setup && props.setup.photos
    this.state = {
      cameraImages: [],
      loadingMore: false,
      lastCursor: "",
      noMorePhotos: false,
      selection: new Set(hasPhotos ? props.setup.photos.map(p => p.file) : []),
    }
  }

  componentDidMount() {
    this.tryPhotoLoad()
  }

  tryPhotoLoad() {
    if (!this.state.loadingMore) {
      this.setState({ loadingMore: true }, () => {
        this.loadPhotos()
      })
    }
  }

  loadPhotos() {
    // TODO: Need to update the RN 0.48 types on DT
    const fetchParams: any = {
      first: 20,
      assetType: "Photos",
    }

    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor
    }

    // This isn't optimal, but CameraRoll isn't provided in
    // the React Native mock from Jest. This means that it
    // can't be tested, and it will be undefined.
    const inTesting = typeof jest !== "undefined"
    if (inTesting) {
      return
    }

    this.getCameraRollPhotos(fetchParams).then(data => this.appendAssets(data))
  }

  appendAssets(data) {
    const assets = data.edges

    if (assets.length === 0) {
      this.setState({
        loadingMore: false,
        noMorePhotos: !data.page_info.has_next_page,
      })
    } else {
      this.setState({
        loadingMore: false,
        noMorePhotos: !data.page_info.has_next_page,
        lastCursor: data.page_info.end_cursor,
        cameraImages: this.state.cameraImages.concat(assets.map(a => a.node)),
      })
    }
  }

  onScroll(e) {
    const windowHeight = Dimensions.get("window").height
    const height = e.nativeEvent.contentSize.height
    const offset = e.nativeEvent.contentOffset.y

    if (windowHeight + offset >= height) {
      this.tryPhotoLoad()
    }
  }

  endReached() {
    if (!this.state.noMorePhotos) {
      this.tryPhotoLoad()
    }
  }

  doneTapped = () => {
    this.props.updateWithPhotos([...this.state.selection.values()])
    this.props.navigator.pop()
  }

  getCameraRollPhotos = (params: any) => CameraRoll.getPhotos(params)

  onPressNewPhoto = () => {
    return triggerCamera(this)
      .then(success => {
        if (success) {
          // Grab the most recent photo
          // and add it to the top

          const fetchParams: any = {
            first: 1,
            assetType: "Photos",
          }

          this.getCameraRollPhotos(fetchParams).then(photos => {
            if (!photos.edges || photos.edges.length === 0) {
              console.error("SelectFromLibrary: Got no photos when looking for most recent")
            } else {
              const photo = photos.edges.map(e => e.node)[0]

              // Update selection
              this.state.selection.add(photo.image.uri)
              this.setState({
                selection: this.state.selection,
                // An item in cameraImage is a subset of the photo that we pass in,
                // so we `as any` to avoid a compiler error
                cameraImages: [photo].concat(this.state.cameraImages as any),
              })
            }
          })
        } else {
          console.log("SelectFromLibrary: Did not receive a photo from call to getPhotos")
        }
      })
      .catch(error => {
        const errors = ARTakeCameraPhotoModule.errorCodes
        switch (error.code) {
          case errors.cameraNotAvailable:
          case errors.imageMediaNotAvailable:
            Alert.alert(error.message)
            break

          case errors.cameraAccessDenied:
            Alert.alert(
              error.message,
              "Please enable camera access from Settings to be able to take photos of your artwork.",
              [
                { text: "Cancel" },
                {
                  text: "Settings",
                  onPress: () => Linking.openURL(ARCocoaConstantsModule.UIApplicationOpenSettingsURLString),
                },
              ]
            )
            break

          case errors.saveFailed:
            const underlyingError = error.userInfo && error.userInfo.NSUnderlyingError
            Alert.alert(error.message, underlyingError && `${underlyingError.message} (${underlyingError.code})`)
            break

          default:
            console.error(error)
        }
      })
  }

  onNewSelectionState = (_state: Set<string>) => this.setState({ selection: this.state.selection })

  render() {
    return (
      <ConsignmentBG>
        <DoneButton onPress={this.doneTapped} bodyStyle={doneButtonStyles} buttonText="DONE">
          <ScrollView
            style={{ flex: 1 }}
            scrollsToTop={true}
            onScroll={this.onScroll.bind(this)}
            scrollEventThrottle={50}
          >
            <View style={{ paddingTop: 40 }}>
              <P>We suggest adding a few photos of the work including the front and back as well as the signature.</P>
              <ImageSelection
                data={this.state.cameraImages}
                onPressNewPhoto={this.onPressNewPhoto}
                onUpdateSelectedStates={this.onNewSelectionState}
                selected={this.state.selection}
              />
            </View>
          </ScrollView>
        </DoneButton>
      </ConsignmentBG>
    )
  }
}
