import {
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export type Props = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedScrollView = ({ style, children }: ScrollViewProps) => {
  const theme = useColorScheme();

  return (
    <ScrollView
      style={[
        {
          backgroundColor:
            theme === 'dark' ? Colors.dark.background : Colors.light.background,
        },
        styles.scrollView,
        style,
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 110,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
});
