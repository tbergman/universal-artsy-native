import { findNodeHandle, NativeModules } from "react-native"
const { ARSwitchBoardModule } = NativeModules

// function presentNavigationViewController(component: React.Component<any, any>, route: string) {
//   let reactTag
//   try {
//     reactTag = findNodeHandle(component)
//   } catch (err) {
//     console.error(`Unable to find tag in presentNavigationViewController: ${err.message}`)
//     return
//   }

//   ARSwitchBoardModule.presentNavigationViewController(reactTag, route)
// }

function presentModalViewController(component: React.Component<any, any>, route: string) {
  let reactTag
  try {
    reactTag = findNodeHandle(component)
  } catch (err) {
    console.error(`Unable to find tag in presentModalViewController: ${err.message}`)
    return
  }

  ARSwitchBoardModule.presentModalViewController(reactTag, route)
}

function presentMediaPreviewController(
  component: React.Component<any, any>,
  route: string,
  mimeType: string,
  cacheKey?: string
) {
  let reactTag
  try {
    reactTag = findNodeHandle(component)
  } catch (err) {
    console.error(`Unable to find tag in presentMediaPreviewController: ${err.message}`)
    return
  }

  ARSwitchBoardModule.presentMediaPreviewController(reactTag, route, mimeType, cacheKey)
}

function dismissModalViewController(component: React.Component<any, any>) {
  let reactTag
  try {
    reactTag = findNodeHandle(component)
  } catch (err) {
    console.error(`Unable to find tag in dismissModalViewController: ${err.message}`)
    return
  }

  ARSwitchBoardModule.dismissModalViewController(reactTag)
}

// function presentArtworkSet(component: React.Component<any, any>, artworkIDs: string[], index: number) {
//   let reactTag
//   try {
//     reactTag = findNodeHandle(component)
//   } catch (err) {
//     console.error(`Unable to find tag in presentArtworkSet: ${err.message}`)
//     return
//   }

//   ARSwitchBoardModule.presentArtworksSet(reactTag, artworkIDs, index)
// }

export default {
  // presentNavigationViewController,
  presentMediaPreviewController,
  presentModalViewController,
  dismissModalViewController,
  // presentArtworkSet,
}
